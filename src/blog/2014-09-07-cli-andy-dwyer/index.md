---
slug: inspirational-andy-dwyer-cli
title: Inspirational Andy Dwyer Quotes For My Command Line
date: 2014-09-07
category: Development
tags: [cli, console, andy dwyer, parks and recreation, lolcat, fortune, cowsay]
---

On Friday I was procrastinating by reading some command line tricks articles and I encountered three commands I haven't noticed before: [`fortune`](<http://en.wikipedia.org/wiki/Fortune_(Unix)>), [`cowsay`](https://en.wikipedia.org/wiki/Cowsay) and [`lolcat`](https://github.com/busyloop/lolcat). A little bit earlier someone also posted this [Buzzfeed article with inspirational Andy Dwyer quotes](http://www.buzzfeed.com/mrloganrhoades/if-andy-dwyer-quotes-were-motivational-posters#4hjk6yw) and one thing let to another.

![Inspirational Andy Dwyer Quotes](login.png)

To get inspirational Andy Dwyer quotes into your terminal you need four things: `fortune` (to display a quote), `cowsay` (to make a cow say the quote), `lolcat` (for the rainbow coloring) and, of course, the quotes. On a Mac you can use Homebrew to install `fortune` and `cowsay`:

```
$ brew install fortune cowsay
```

`lolcat` is a Ruby program and can you can install it using RubyGems:

```
$ sudo gem install lolcat
```

## Lolcat

Let's try these three programs out. `lolcat` is first.

![Output of the command lolcat in Terminal.app on Mac OS](lolcat.png)

## Cowsay

You can pipe input to `cowsay` to make it appear in a speak bubble on top of a cow. `cowsay` has some options to change the eyes and the tongue and even use a different animal, for example, a dragon.

```
$ echo "Hello World!" | cowsay
 _____________
< Hello World >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Fortune

If you call `fortune` without any arguments it will print a random quote.

```
$ fortune
Felson's Law:
    To steal ideas from one person is plagiarism; to steal from
    many is research.
```

The default database contains some pretty sexist quotes, as you sadly can expect from something written by white males. But I want to use my own database anyway. The format of a quotes file is pretty simple. You separate the quotes by a single `%` on a newline.

```
My whole life is a giant mess and I love it
-- Andy Dwyer
%
I know what things are.
-- Andy Dwyer
%
You're like an angel with no wings.
-- Andy Dwyer
```

However, the `fortune` program reads compiled data files and we can use `strfile` to create these:

```
$ strfile andy andy.dat
```

I can now call `fortune` with this quote file and it will only show quotes from the given file:

```
$ fortune andy
```

You can also find these files in my [dotfiles repository](https://github.com/florianeckerstorfer/dotfiles/tree/master/fortune). There is also a file with Tyrion Lannister quotes.

## Piping it All Together

If I now call `fortune`, pipe the output into `cowsay` and then pipe its output into `lolcat` I get the result displayed in the first screenshot.

```
$ fortune ~/dotfiles/fortune/andy | cowsay -s | lolcat
```

I placed this line in my `.bash_profile` file and now every time I open a terminal window I get an inspirational Andy Dwyer quote.
