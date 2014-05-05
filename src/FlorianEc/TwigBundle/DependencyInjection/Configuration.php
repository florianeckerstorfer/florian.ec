<?php

namespace FlorianEc\TwigBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * Configuration.
 *
 */
class Configuration implements ConfigurationInterface
{
    /**
    * {@inheritdoc}
    */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();

        $rootNode = $treeBuilder->root('florian_ec_twig');
        $rootNode
            ->children()
                ->arrayNode('picture_sizes')
                    ->prototype('array')
                        ->children()
                            ->scalarNode('name')->end()
                            ->scalarNode('min_width')->defaultValue(null)->end()
                            ->booleanNode('has2x')->defaultFalse()->end()
                            ->booleanNode('default')->defaultTrue()->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
