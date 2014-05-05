<?php

class SculpinKernel extends \Sculpin\Bundle\SculpinBundle\HttpKernel\AbstractKernel
{
    protected function getAdditionalSculpinBundles()
    {
        return ['FlorianEc\TwigBundle\FlorianEcTwigBundle'];
    }
}
