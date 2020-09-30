---
permalink: blog/programming/
title: What Does it Mean to be a Programmer
date: 2014-09-13
category: Programming
tags: [programming]
---

When I first dabbled into writing software 15 years ago the world of programming was an easy place. When you would write on the internet that PHP is a programming language, someone would remind you that PHP is a scripting language because the computer interprets it instead of compiling it. You had scripting languages, like PHP, JavaScript or Python and programming languages like C, C++ or Java. It's not that easy anymore. Facebook created HipHop to compile PHP into C++ code (technically that's a [transpiler](http://en.wikipedia.org/wiki/Source-to-source_compiler)) and later switched to a [Just-in-Time (JIT) compiler](http://en.wikipedia.org/wiki/Just-in-time_compilation) called [HHVM](http://hhvm.com). Google, Apple, Mozilla and Microsoft doing [crazy optimizations](http://arstechnica.com/information-technology/2014/05/apple-integrates-llvm-compiler-to-boost-webkit-javascript-performance/) to make JavaScript execution to run nearly as fast as native code.

One of the consequences of these developments is that, for example, PHP does no longer mean the full stack of the programming language. You can write code in PHP syntax and interpret it with the official PHP interpreter or you can HHVM`s Just-in-Time compiler. Another example is [Dart](https://www.dartlang.org), a language developed by Google that can run in a VM or you can transpile it to JavaScript to run in a browser. We need to separate the writing of the code (a human using the syntax of a language to create a program) from the execution of the code (a machine reading the code and converting it into a form understood by the hardware). The choice of programming language (or syntax) no longer gives us any indication how and where the code runs.

If you write code in JavaScript you should be aware that this code might execute in a browser, or on a [server](http://nginx.org), or on a [desktop computer](https://github.com/rogerwang/node-webkit) or in a [native phone app](https://cordova.apache.org).

Yesterday [@alicetragedy](https://twitter.com/alicetragedy) [tweeted](https://twitter.com/alicetragedy/status/510427598850363392) the following quote from [@patio11](https://twitter.com/patio11) from [Frozen Rails](http://2014.frozenrails.eu).

> Ruby's just a tool. You'll never hear a lawyer say: I'm a Microsoft Word lawyer. Check out this contract! Copy, paste, nailed it!

Exactly for this reason you don't see me describing myself as a _PHP Developer_ but as a _Web Developer_ or just _Developer_. I write most of my code in PHP and JavaScript and I have written code in Ruby, Python, Java, C and other languages before and I am quite confident that I can write any program in any [imperative programming](http://en.wikipedia.org/wiki/Imperative_programming) language (preferrable with C-style syntax). I also did some [functional programming](http://en.wikipedia.org/wiki/Functional_programming), but never enough that I could fully wrap my head around it. The concepts in all these programming languages are basically the same: functions, loops, conditionals and variables.

I find the hard part of learning a new programming language is not the language itself, but the ecosystem. When I write software in PHP and have a specific task I often know the frameworks and libraries to help me, I know exactly where to look for them and if a library is good or bad. The boom of package repositories such as [Packagist](https://packagist.org), [NPM](https://www.npmjs.org), [RubyGems](https://rubygems.org), [CocoaPod](http://cocoapods.org) and so on make it easier to find new packages but you need experience with the community, the language and the conventions of the language to judge if a package is useful, well written and well mantained. Connected to this is the fact that knowing a programming language does not enable you to write a "big" application in it. Often it's more effort to learn a new framework than a new language. Full-stack frameworks like [Symfony](http://symfony.com), [Rails](http://rubyonrails.org) or [Django](https://www.djangoproject.com) are monsters with hundreds of APIs, conventions and configuration formats.

Above I said that I am confident that I can write any program in any language. What I didn't say is that I can write any program in the best possible way in any language. You still need years of experience to master the nitty gritty details of a programming language. And often execution environment matters in addition to the syntax of the language. Let me give you a quick example in PHP:

```php
// Merge the following two arrays
$array1 = ['PHP', 'Ruby', 'Python', 'JavaScript'];
$array2 = ['Java', 'C', 'C++'];

// Method 1
$fullArray = array_merge($array1, $array2);

// Method 2
$fullArray = $array1;
foreach ($array2 => $value) {
    $fullArray[] = $value;
}
```

Which of the two methods executes faster? Well. It depends.

- In PHP 5.3 when the arrays have 100,000 or more elements **Method 2** runs faster.
- In PHP 5.5 **Method 2** only runs faster when the arrays have more than 10,000,000 elements.

Clearly there have been some optimizations to the `array_merge` method over the years. I don't have an installation of HHVM ready but the results there may be different again. I don't know such specific performance implications when writing Ruby oder Python code. Years and years of experience, debugging and frustrations gave me such a deep knowledge about PHP. As we can see in the differences between PHP 5.3 and 5.5 the behaviour of the platforms changes in addition to the syntax; if I once knew every optimization doesn't mean I know them in the next version.

I believe that a programmer becomes a professional programmer by being able to generalise specific solutions in a specific programming language on a specific platform to programming in general. If you can systematically identify problems and solve them systematically (and reproducable) you have become a professional programmer.
