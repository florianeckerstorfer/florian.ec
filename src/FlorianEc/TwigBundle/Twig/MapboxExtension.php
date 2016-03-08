<?php

namespace FlorianEc\TwigBundle\Twig;

class MapboxExtension extends \Twig_Extension
{
    private $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('mapboxMarker', [$this, 'mapboxMarker'], ['is_safe' => ['html']]),
        );
    }

    public function mapboxMarker($title, $coordinates, $dates = [])
    {
        if (!is_array($dates)) {
            $dates = [$dates];
        }
        $json = [
            'type' => 'Feature',
            'geometry' => [
                'type'        => 'Point',
                'coordinates' => $coordinates,
            ],
            'properties' => [
                'title'         => $title,
                'description'   => array_map(function ($v) { return '<li>'.$v.'</li>'; }, $dates),
                'marker-symbol' => 'circle'
            ],
        ];

        return json_encode($json);
    }

    public function getName()
    {
        return 'florian_ec_twig_mapbox';
    }
}
