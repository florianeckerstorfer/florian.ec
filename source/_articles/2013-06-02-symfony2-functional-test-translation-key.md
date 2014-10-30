---
title: Use translation keys in Symfony2 functional tests
tags: [ symfony2, testing, translation, php ]
---

{% block summary %}

One of the best practices in testing code is to use a less information that is context to change in the test code. When writing functional tests we often have to check for the existance of certain strings on a page. However, text and translations change, so let's use the translation keys in our tests instead.

{% endblock %}

{% block content %}

Whenever writing functional tests I think it is a good idea to use translation keys in the assertions instead of the real text. The translation keys are less likely to change over time and it is often much simpler, because they don't contain dynamic content.

However, Symfony2 automatically translates all text even in the test environment and I could not find an easy solution on how to deactivate translation in the test environment.

The simpliest way to disable translation in functional tests is to create a new translator that returns the message ID instead of the translated message.

<pre><code class="php"># src/Acme/DemoBundle/Translator/NoTranslator.php

namespace Acme\DemoBundle\Translator;

use Symfony\Component\Translation\TranslatorInterface;

class NoTranslator implements TranslatorInterface
{
    public function trans($id, array $parameters = array(),
        $domain = null, $locale = null)
    {
        return $id;
    }

    public function transChoice($id, $number, array $parameters = array(),
        $domain = null, $locale = null)
    {
        return $id;
    }

    public function setLocale($locale)
    {
    }

    public function getLocale()
    {
        return '--';
    }

    public function setFallbackLocale($locale)
    {
    }

    public function addResource($resource)
    {
    }
}</code></pre>

Now we need a way to switch the default translatior to our `NoTranslator`. The easiest way to do this is override the `translator.class` variable, however, this changes the translation for all environments and I want to change the translator only in the test environment.

Another way to override a service is to write a compiler pass.

<pre><code class="php"># src/Acme/DemoBundle/DependencyInjection/Compiler/TranslatorCompilerPass.php

namespace Acme\DemoBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\KernelInterface;

class TranslatorCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $definition = $container->getDefinition('translator.default');
        $definition->setClass('Acme\DemoBundle\Translator\NoTranslator');
    }
}
</code></pre>

This would, again, override the translator in all environments. We need an instance of `AppKernel` to check the environment. At this stage of the boot process of the Symfony2 kernel we don't have access to the kernel via the dependency injection container. The only place where we have access to the kernel at that early stage is the `AppKernel` itself and therefore we need to pass it through to our compiler from there.

<pre><code class="php"># app/AppKernel.php

// ...

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        // ...

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Acme\DemoBundle\AcmeDemoBundle($this);
            // ...
        }

        // ...
    }
    // ...
}
</code></pre>

This is absolutley ok to do. You would have to add your bundle anyways in the `AppKernel.php` and this is also done by one of the default bundles (`JMSDiExtraBundle`). Now we passed the kernel to `AcmeDemoBundle`. There we need to initialize the compiler pass with the kernel.

<pre><code class="php"># src/Acme/DemoBundle/AcmeDemoBundle.php

namespace Acme\DemoBundle;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\HttpKernel\KernelInterface;

use Acme\DemoBundle\DependencyInjection\Compiler\TranslatorCompilerPass;

class AcmeDemoBundle extends Bundle
{
    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(
            new TranslatorCompilerPass($this->kernel)
        );
    }
}
</code></pre>

The last thing we have to do is to adapt `TranslatorCompilerPass` to accept the kernel and check the environment.

<pre><code class="php"># src/Acme/DemoBundle/DependencyInjection/Compiler/TranslatorCompilerPass.php

namespace Acme\TestingBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\KernelInterface;

class TranslatorCompilerPass implements CompilerPassInterface
{
    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function process(ContainerBuilder $container)
    {
        if ('test' === $this->kernel->getEnvironment()) {
            $definition = $container->getDefinition('translator.default');
            $definition->setClass('Acme\DemoBundle\Translator\NoTranslator');
        }
    }
}
</code></pre>

Done. We can now write our assertions in functional tests for translation keys instead of translated messages.

I added the code required to disable translation to my [BraincraftedTestingBundle](https://github.com/braincrafted/testing-bundle), but I wanted to explain what I did. If there is a more conveniet solution please let me know.

*Update March 19, 2014:* Reader Gilles Doge emailed me to add that you can override the `translator.class` variable only in the `test` environment:

<pre><code class="yaml"># app/config/config_test.yml
parameters:
    translator.class: Acme\DemoBundle\Translation\Translator\NoTranslator</code></pre>

In this case you don't need to create an additional compiler pass. However, my solution has the advantage that you can place it in my TestingBundle and have this functionality automatically in all my projects.

Symfony2 Cookbook: How to Override any Part of a Bundle - [Services & Configuration](http://symfony.com/doc/2.2/cookbook/bundles/override.html#services-configuration)
Symfony2 Cookbook: [How to work with Compiler Passes in Bundles](http://symfony.com/doc/2.2/cookbook/service_container/compiler_passes.html)

{% endblock %}
