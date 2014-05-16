---
title: Implementing an asynchronous message queue in PHP with React
tags: [ php, react, message queue ]
summary: |
    A fun exercise in programming. Implementing a asynchronous, non-blocking message queue in PHP.
---

Unlike most other programming and scripting languages PHP does not support threads[^pthreads] and threads would be required to implement a truly asynchronous, non-blocking message queue. Challange accepted.

In this article I am going to explain how you can implement a message queue in PHP. I do this mostly for fun and pleasure, because in most production scenarios you probably want to use a real message queue like [RabbitMQ](http://www.rabbitmq.com).

The message queue typically consists of a server that accepts messages. These messages are sent by a producer and are received by a consumer.

### The server

The server is a program that runs in the background and listens to a specific port. Whenever a message arrives at the given port it invokes a consumer with the given message.

Running in the background, listening to a port, reacting when a message arrives. That sounds like a job for [ReactPHP](http://reactphp.org). In our case we only need the socket server of React and fortunately there is a subtree split of [reacts socket component](https://github.com/reactphp/socket).

If you are using [Composer](http://getcomposer.org) (if not you really should) you can add `react/socket` to your project.

    // composer.json
    {
        "require": {
            "react/socket": "0.3.*"
        }
    }

With React we can implement a simple server that listens to a socket and executes code whenever new data arrives at the socket.

    // server.php

    require_once __DIR__.'/vendor/autoload.php';

    // Create loop and socket
    $loop   = React\EventLoop\Factory::create();
    $socket = new React\Socket\Server($loop);

    // New connection is established
    $socket->on('connection', function (\React\Socket\ConnectionInterface $conn) {
        // New data arrives at the socket
        $conn->on('data', function ($data) use ($conn) {
            // TODO: Handle message
            echo "$data";
            // Close the connection when we consumed the message
            $conn->close();
        });
    });

    // The socket should listen to port 4000
    $socket->listen(4000);
    $loop->run();

In the above script I added a simple `echo` to output the received data. We could now run `php server.php`to start our server and send messages to it by connecting to it via `telnet localhost 4000`.

[![React server that echoes messages](/img/php-asynchronous-message-queue/react-server-800.png)](/img/php-asynchronous-message-queue/react-server.png)

Let's assume that our message queue receives messages and needs to perform some time-consuming task with them. We will simulate this with the following code.

    function consume($data, \React\Socket\ConnectionInterface $conn)
    {
        for ($i = 0; $i < 5; $i++) {
            echo sprintf("%s: Do something with %s\n", date('H:i:s'), $data);
            sleep(1);
        }
    }

When we run two `telnet` simultaneously we will receive the following output:

    19:18:07: Do something with foo
    19:18:08: Do something with foo
    19:18:09: Do something with foo
    19:18:10: Do something with foo
    19:18:11: Do something with foo
    19:18:12: Do something with bar
    19:18:13: Do something with bar
    19:18:14: Do something with bar
    19:18:15: Do something with bar
    19:18:16: Do something with bar

Client 1 has an open connection to the server for five seconds and client 2 has an open connection to the server for ten seconds. We want that the clients tranfer a message to the server and immediately close the connection while the server accepts new messages and works on those tasks in the background.

Now is a good time to remember the last posting I wrote here: [Running background processes in PHP](http://braincrafted.com/php-background-processes/).

We can use [BcBackgroundProcess](https://github.com/braincrafted/background-process) to create a background process and consume the message there.

    // composer.json
    {
        "require": {
            "react/socket":                     "0.3.*",
            "braincrafted/background-process":  "dev-master"
        }
    }

When using the factory provided by BcBackgroundProcess it is quite easy to create a new process and execute it in the background.

    // server.php
    ...
    $processFactory = new \Bc\BackgroundProcess\Factory('\Bc\BackgroundProcess\BackgroundProcess');

    $socket->on('connection', function (\React\Socket\ConnectionInterface $conn) use ($processFactory) {
        $conn->on('data', function ($data) use ($conn, $processFactory) {
            $command = sprintf('php consumer.php "%s"', addslashes($data));
            $processFactory->newProcess($command)->run();

            $conn->close();
        });
    });
    ...

The command executed in the above code is `php consumer.php` with the message as first (and only) argument.

### The consumer

The consumer is another script which is executed by the server as background process. It's first and only argument is the message. The biggest disadvantage of executing the code in a background process (compared to what we could do if PHP would support threads) is that we can no longer communicate with the server and thus can't output anything there. Instead we will write log messages to a file.

    // consumer.php

    function consume($message, $filename)
    {
        for ($i = 0; $i < 5; $i++) {
            $data = sprintf("%s: Do something with %s\n", date('H:i:s'), $message);
            file_put_contents($filename, $data, FILE_APPEND);
            sleep(1);
        }
    }

    $message = stripslashes($_SERVER['argv'][1]);
    consume($message, "message.log");

Ok, let's try this out. In my experiment I will open four Terminal windows in parallel. The first one will run the server, the second one will watch the `message.log` log (with `tail -f`) and the third and forth will be used to write to the message server.

[![Screenshot of a Terminal window running server.php, reading the log file and running two clients](/img/php-asynchronous-message-queue/mq-server-800.png)](/img/php-asynchronous-message-queue/mq-server.png)

You can see that both messages are consumed in parallel and that the client is started and closes within a second.

### The producer

In reality you will probably never send messages to a MQ server using the `telnet` command line utility, but rather send messages from another script.

When you are using PHP it is extremely simple to write a message to a socket.

    // produce.php

    function produce($message)
    {
        $fp = @stream_socket_client('tcp://localhost:4000', $errno, $errstr, 30);
        if ($fp) {
            fwrite($fp, $message);
            fclose($fp);
        }
    }

    produce("Hello World!");


### Use Cases

As mentioned above this code is not really useful in a production environment. However, I use such a message queue to send real time notifications from a task that runs once a week for a few hours. The task is used only internal and not critical and therefore it would be a huge overkill to install and maintain a real message queue.


### BcMq

I created a library from the code described in this article. The principles are the same, but it has a nicer architecture and is tested. You can find it on Github: [BcMq](https://github.com/braincrafted/mq).


### BcMqBundle

If you want to use the code in a Symfony2 application I made things even easier by creating a bundle that encapsulates BcMq. The bundle uses services to consume messages which makes it quite easy and elegant. Detailed instructions on how to install and use the bundle can be found on Github: [BcMqBundle](https://github.com/braincrafted/mq-bundle).

Feedback to this article is welcome. Please [email](mailto:florian@eckerstorfer.co) me or contact @Florian_ on [Twitter](http://twitter.com/Florian_).

[^pthreads]: However, there is an extension called [pthreads](http://docs.php.net/manual/en/book.pthreads.php)
