---
title: "Password, Please!"
date: 2014-10-04T00:00:00.000Z
category: Automation
tags: [ password, security, alfred ]
path: /password-please-0.2/
published: true
---

Since a few years I generate a new password for every service I sign up and I use [1Password](https://agilebits.com/onepassword) to manage them for me. But one thing that bothered me for a while was the generation of new passwords. It involves a lot of mouse usage and I like to use the keyboard as much as possible. Also changing the password receipt is quite cumbersome and I wanted to have a faster way to generate passwords of differnet length and complexity.

Therefore I created a small PHP library and CLI script as well as a Alfred workflow to invoke it. I am using it for a few weeks now and it works great for my purposes.

![Password, Please! Alfred Workflow](password-please-alfred.gif)

The source code of both the [Alfred workflow](https://github.com/florianeckerstorfer/passwordplease-alfred) and the [PHP library and CLI](https://github.com/florianeckerstorfer/passwordplease-php) are on Github.
