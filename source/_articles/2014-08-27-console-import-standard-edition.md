---
title: Console Import Standard Edition
tags: [ import, data, php, console, script, symfony ]
slug: console-import-standard-edition
---
{% block summary %}

Quite often I have to write a script that takes data from a source, filter and converts it and stores it some way.
Nearly every time I use the great [data-import](https://github.com/ddeboer/data-import) library by David de Boer and
the [Symfony Console](https://github.com/symfony/console) component. It annoyed me that I have to write some boiler
plate code every single time and therefore I created
[Console Import Standard Edition](https://github.com/florianeckerstorfer/console-import-standard).

{% endblock %}

{% block content %}

Inspired by the Symfony Standard Edition it contains a basic directory structure, a `composer.json` with
`ddeboer/data-import` and `symfony/console` as dependencies and a simple executable.

You can bootstrap an import script project by using Composer and the following command:

<pre><code class="shell">$ php composer.phar create-project florianeckerstorfer/console-import-standard-edition path/to/install</code></pre>

Then you only need to change the namespace and adapt the code inside the `ImportCommand` to fit your needs. The
projects [README.md](https://github.com/florianeckerstorfer/console-import-standard/blob/master/README.md) contains
more information on how to setup a project and customize it.

{% endblock %}
