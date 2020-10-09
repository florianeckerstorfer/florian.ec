---
permalink: blog/symfony-bower-bootstrap/
title: Using Bower with Symfony2 and Bootstrap
date: 2014-05-29T18:00:00.000Z
category: Development
tags: [symfony2, php, bootstrap, bootstrap-bundle]
description:
---

There exist a lot of different ways to get third party assets into your project and one such way is Bower. Bower is an asset management tool from Twitter and you can use it to get Bootstrap into your Symfony project. I will explain how you can use it in combination with BraincraftedBootstrapBundle, my bundle that integrates Bootstrap into Symfony.

First I will assume that we have a fresh installation of [Symfony Framwork standard edition](http://symfony.com/download) and that you have [Bower](http://bower.io) installed. If you don't, do it now:

```shell
$ npm install -g bower
$ composer create-project symfony/framework-standard-edition symfony-bower-bootstrap/ 2.4.5
$ cd symfony-bower-bootstrap
```

We can now add [BraincraftedBootstrapBundle](http://bootstrap.braincrafted.com) to the project and use Bower to download the Bootstrap assets:

```shell
$ composer require braincrafted/bootstrap-bundle:@stable
$ bower init
$ bower install bootstrap --save
```

Add the bundle class to `app/AppKernel.php`

```php
// app/AppKernel.php

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new Braincrafted\Bundle\BootstrapBundle\BraincraftedBootstrapBundle(),
        );
        // ...
    }
}
```

In this article I am going to use Assetic to configure and compile the Bootstrap assets. BootstrapBundle comes with a handy auto configure functionality that configures Assetic for you. However, this functionality only works if you install Bootstrap using Composer and therefore we need to disable it.

```yaml
# app/config/config.yml

braincrafted_bootstrap:
  auto_configure:
    assetic: false
```

The current stable release of BootstrapBundle supports only the [Less](http://lesscss.org) version of Bootstrap, but BootstrapBundle v2.1 adds support for the [official Sass port of Bootstrap](https://github.com/twbs/bootstrap-sass). In this article I am going to use the Less version, but it works pretty similar if for bootstrap-sass.

```yaml
# app/config/config.yml

assetic:
    filters:
        less:
            node: /usr/local/bin/node
            node_paths: [/usr/local/lib/node_modules]
            apply_to: "\.less$"
        cssrewrite: ~
```

We also need to tell Assetic where it finds the assets. By default Bower installs assets in the `bower_components` directory. If you have modified the location you also need to change it in the following snippet:

```yaml
# app/config/config.yml

assetic:
    ...
    assets:
        bootstrap_css:
            inputs:
                - %kernel.root_dir%/../bower_components/bootstrap/less/bootstrap.less
                - %kernel.root_dir%/../vendor/braincrafted/bootstrap-bundle/Braincrafted/Bundle/BootstrapBundle/Resources/less/form.less
            filters:
                - less
                - cssrewrite
            output: css/bootstrap.css
        bootstrap_js:
            inputs:
                - %kernel.root_dir%/../bower_components/bootstrap/js/transition.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/alert.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/button.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/carousel.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/collapse.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/dropdown.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/modal.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/tooltip.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/popover.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/scrollspy.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/tab.js
                - %kernel.root_dir%/../bower_components/bootstrap/js/affix.js
                - %kernel.root_dir%/../vendor/braincrafted/bootstrap-bundle/Braincrafted/Bundle/BootstrapBundle/Resources/js/bc-bootstrap-collection.js
            output: js/bootstrap.js
        jquery:
            inputs:
                - %kernel.root_dir%/../bower_components/jquery/dist/jquery.js
            output: js/jquery.js
```

_Note that BootstrapBundle includes a `less` and a `js` file to provide additional fixes and functionality when using Bootstrap in a Symfony application. You need to include those from the installed bundle._

If you now dump the assets you should three files: `css/bootstrap.css`, `js/bootstrap.js` and `js/jquery.js`.

```shell
$ php app/console assetic:dump
```

_Note that Assetic will also create the intermediate files when run in the `dev` environment._

You can now create a basic layout and include the Bootstrap CSS and JavaScript assets and start building your application.

```html
<!-- src/Acme/DemoBundle/Resources/views/layout.html.twig -->

<!DOCTYPE html>
<html>
<head>

    <title>Bootstrap 101 Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="{{ "{{ asset('css/bootstrap.css') }}" }}" rel="stylesheet" media="screen">

    <!-- HTML5 Shim and Respond.js add IE8 support of HTML5 elements and media queries -->
    {{ "{% include 'BraincraftedBootstrapBundle::ie8-support.html.twig' %}" }}

</head>

<body>
    <div class="container">
        <div class="page-header">
            <h1>Hello, world!</h1>
        </div>
    </div>

    <!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
    <script src="{{ "{{ asset('js/jquery.js') }}" }}"></script>
    <!-- Include all JavaScripts, compiled by Assetic -->
    <script src="{{ "{{ asset('js/bootstrap.js') }}" }}"></script>
</body>
</html>
```

_Please note that the BootstrapBundle includes a basic layout template you can use. However, there has been a bug in `v2.0._`that caused`bootstrap.js`not to load. We fixed the bug in`v2.1.0-alpha1`.\*

![Screenshot of Login Form](/blog/2014-05-29-symfony-bower-bootstrap/login.png)

In addition to this article I also created a demo project where you can follow the steps in this article in a full Symfony project. The source code of this demo project resides on Github: <code><a href="https://github.com/florianeckerstorfer/symfony-bower-bootstrap">florianeckerstorfer/symfony-bower-bootstrap</a></code>.
