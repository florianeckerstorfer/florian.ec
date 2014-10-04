---
layout: wide-small
title: "Password, please!"
permalink: password-please/
---

<header class="page-header">
    <h1>Password, Please!</h1>
</header>

**Password, Please!** generates secure passwords for you. If you use a password manager and you generate a new password for every service you sign up you probably need to generate a lot of passwords. **Password, Please!** makes this super easy and fast while still providing options to customize passwords on a case-by-case basis.

Currently there exists a workflow for Alfred and a command line tool written in PHP.

### Alfred Workflow

![Password, Please! Alfred Workflow](/img/password-please/password-please-alfred.gif)

Download the latest [release](https://github.com/florianeckerstorfer/passwordplease-alfred/releases) from Github and double-click the `alfredworkflow` file to install the workflow. The default keyword to invoke **Password, Please!** is `pwd`. When invoked without arguments the generated password has a very high complexity and a length of 20 characters. You can supply one or two optional arguments; the first one is the length of the password and the second one is the complexity. The complexity can be either a number between `1` (very high complexity) and `4` (low complexity) or one of theses aliases:

- `veryhigh`, `harder`
- `high`, `hard`
- `medium`, `normal`
- `low`, `easy`

### Command Line Tool

Detailed installation and usage instructions for the command line tool can be found on its [Github page](https://github.com/florianeckerstorfer/passwordplease-php).
