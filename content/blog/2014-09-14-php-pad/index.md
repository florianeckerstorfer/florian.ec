---
slug: /php-pad
title: PHP Pad
date: 2014-09-14
category: Development
tags: [php, terminal, cli, dotfiles]
---

When writing an article or code I often need to try something out or create a small benchmark. Typically I create a PHP file, open it in Sublime Text and run it in the terminal whenever I change something. Easy enough, but it happens regularly so I thought about automating this process.

I added a Bash function to my Dotfiles that creates an empty PHP file, opens it in Sublime Text and uses [Watchman](https://facebook.github.io/watchman/) to run the file whenever it changes. At first I thought this should be trivial, but it I had some problems. But let's go through it step-by-step. Creating and opening a file is easy, I just used the `subl` command. However, to execute the script when it changes I needed to use Watchman and there is no obvious way to display the output of the executed script in the terminal. Therefore I create a wrapper bash script and write the output to a log file that I display using `tail -f`.

I added some clean-up functionality, the script deletes the watch and trigger from Watchman and removes the wrapper script and log file after quitting `tail` with `Ctrl-C`. You can use the script below by adding it to your `.bash_profile`.

```shell
function phppad() {
    TMPNAME="phppad-$RANDOM"
    touch "$@"
    subl "$@"
    echo "(echo '$(date +%n%H:%M:%S) $ php $@';php $@) >> $TMPDIR/$TMPNAME.log" > $TMPDIR/$TMPNAME.sh
    chmod +x $TMPDIR/$TMPNAME.sh
    touch $TMPDIR/$TMPNAME.log
    watchman watch `pwd` > /dev/null
    watchman -- trigger `pwd` run "$@" -- $TMPDIR/$TMPNAME.sh > /dev/null
    tail -f $TMPDIR/$TMPNAME.log

    watchman trigger-del `pwd` run > /dev/null
    watchman watch-del `pwd` > /dev/null
    rm $TMPDIR/$TMPNAME.log
    rm $TMPDIR/$TMPNAME.sh
}
```

I know there exists at least one REPL, [PHPSH](https://github.com/facebookarchive/phpsh), but it's no longer maintained and I want to use Sublime Text to write the code and I want to persist the code, even when quitting the command.
