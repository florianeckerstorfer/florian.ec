---
slug: password-please-0.2
title: 'Password, Please!'
date: 2014-10-04
category: Development
tags: [password, security, alfred]
---

Since a few years I generate a new password for every service I sign up and I use [1Password](https://agilebits.com/onepassword) to manage them for me. But one thing that bothered me for a while was the generation of new passwords. It involves a lot of mouse usage and I like to use the keyboard as much as possible. Also changing the password receipt is quite cumbersome and I wanted to have a faster way to generate passwords of differnet length and complexity.

Therefore I created a small PHP library and CLI script as well as a Alfred workflow to invoke it. I am using it for a few weeks now and it works great for my purposes.

![Password, Please! Alfred Workflow](/content/blog/2014-10-04-password-please-0.2/password-please-alfred.gif)

I have set up a page with more information, [passwordplea.se](http://passwordplea.se) (pretty sweet, right?), and the source code of both the [Alfred workflow](https://github.com/florianeckerstorfer/passwordplease-alfred) and the [PHP library and CLI](https://github.com/florianeckerstorfer/passwordplease-php) are on Github.
