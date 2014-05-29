---
title: Using Bower with Symfony2 and Bootstrap
tags: [ symfony2, php, bootstrap, bootstrap-bundle ]
slug: symfony-bower-bootstrap
summary: |
    There exist a lot of different ways to get third party assets into your project and one such way is Bower. Bower is an asset management tool from Twitter and you can use it to get Bootstrap into your Symfony project. I will explain how you can use it in combination with BraincraftedBootstrapBundle, my bundle that integrates Bootstrap into Symfony.
---

<p>{{ page.summary }}</p>

First I will assume that we have a fresh installation of [Symfony Framwork standard edition](http://symfony.com/download) and that you have [Bower](http://bower.io) installed. If you don't, do it now:

<pre><code class="shell">$ npm install -g bower
$ composer create-project symfony/framework-standard-edition symfony-bower-bootstrap/ 2.4.5
$ cd symfony-bower-bootstrap</code></pre>

We can now add [BraincraftedBootstrapBundle](http://bootstrap.braincrafted.com) to the project and use Bower to download the Bootstrap assets:

<pre><code class="shell">$ composer require braincrafted/bootstrap-bundle:@stable
$ bower init
$ bower install bootstrap --save</code></pre>

Add the bundle class to `app/AppKernel.php`

<pre><code class="php">// app/AppKernel.php

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
}</code></pre>

In this article I am going to use Assetic to configure and compile the Bootstrap assets. BootstrapBundle comes with a handy auto configure functionality that configures Assetic for you. However, this functionality only works if you install Bootstrap using Composer and therefore we need to disable it.

<pre><code class="yaml"># app/config/config.yml

braincrafted_bootstrap:
    auto_configure:
        assetic: false</code></pre>

The current stable release of BootstrapBundle supports only the [Less](http://lesscss.org) version of Bootstrap, but BootstrapBundle v2.1 adds support for the [official Sass port of Bootstrap](https://github.com/twbs/bootstrap-sass). In this article I am going to use the Less version, but it works pretty similar if for bootstrap-sass.

<pre><code class="yaml"># app/config/config.yml

assetic:
    filters:
        less:
            node: /usr/local/bin/node
            node_paths: [/usr/local/lib/node_modules]
            apply_to: "\.less$"
        cssrewrite: ~</code></pre>

We also need to tell Assetic where it finds the assets. By default Bower installs assets in the `bower_components` directory. If you have modified the location you also need to change it in the following snippet:

<pre><code class="yaml"># app/config/config.yml

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
            output: js/jquery.js</code></pre>

*Note that BootstrapBundle includes a `less` and a `js` file to provide additional fixes and functionality when using Bootstrap in a Symfony application. You need to include those from the installed bundle.*

If you now dump the assets you should three files: `css/bootstrap.css`, `js/bootstrap.js` and `js/jquery.js`.

<pre><code class="shell">$ php app/console assetic:dump</code></pre>

*Note that Assetic will also create the intermediate files when run in the `dev` environment.*

You can now create a basic layout and include the Bootstrap CSS and JavaScript assets and start building your application.

<pre><code class="html">&lt;!-- src/Acme/DemoBundle/Resources/views/layout.html.twig --&gt;

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;

    &lt;title&gt;Bootstrap 101 Template&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;!-- Bootstrap --&gt;
    &lt;link href="{{ "{{ asset('css/bootstrap.css') }}" }}" rel="stylesheet" media="screen"&gt;

    &lt;!-- HTML5 Shim and Respond.js add IE8 support of HTML5 elements and media queries --&gt;
    {{ "{% include 'BraincraftedBootstrapBundle::ie8-support.html.twig' %}" }}

&lt;/head&gt;

&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;div class="page-header"&gt;
            &lt;h1&gt;Hello, world!&lt;/h1&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- jQuery (necessary for Bootstraps JavaScript plugins) --&gt;
    &lt;script src="{{ "{{ asset('js/jquery.js') }}" }}"&gt;&lt;/script&gt;
    &lt;!-- Include all JavaScripts, compiled by Assetic --&gt;
    &lt;script src="{{ "{{ asset('js/bootstrap.js') }}" }}"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

*Please note that the BootstrapBundle includes a basic layout template you can use. However, there has been a bug in `v2.0.*` that caused `bootstrap.js` not to load. We fixed the bug in `v2.1.0-alpha1`.*

In addition to this article I also created a demo project where you can follow the steps in this article in a full Symfony project. The source code of this demo project resides on Github: <code><a href="https://github.com/florianeckerstorfer/symfony-bower-bootstrap">florianeckerstorfer/symfony-bower-bootstrap</a></code>.

If you have thoughts or comments about this article please provide feedback. You can [email](mailto:florian@eckerstorfer.co) me or contact [@Florian_](http://twitter.com/Florian_).
