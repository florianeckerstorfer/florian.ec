<?php

namespace FlorianEc\TwigBundle\Twig;

class PictureExtension extends \Twig_Extension
{
    /** @var array */
    private $pictureSizes;

    public function __construct(array $pictureSizes)
    {
        $this->pictureSizes = $pictureSizes;
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('picture', [$this, 'pictureFunction'], ['is_safe' => ['html']]),
        );
    }

    public function pictureFunction($url, $alt = '', array $options = array())
    {
        $pictureSizes = [];

        if (isset($options['original']) && $options['original']) {
            $pictureSizes['original'] = [
                'name'      => 'original',
                'min_width' => $options['original_min_width'],
                'has2x'     => false,
                'default'   => false
            ];
        }
        $pictureSizes = array_merge($pictureSizes, $this->pictureSizes);

        $default = null;
        $html = '';

        $html .= '<picture>';
        $html .= '<!--[if IE 9]><video style="display: none;"><![endif]-->';
        foreach ($pictureSizes as $source) {
            $twoxSourceUrl = '';
            $twoxString = '';
            $media = null;
            if ($source['has2x']) {
                $twoxSourceUrl = preg_replace('/(\.(png|jpg|jpeg|gif))/', '-'.$source['name'].'@2x$1', $url);
                $twoxString = sprintf(', %s 2x', $twoxSourceUrl);
            }
            $sourceUrl = preg_replace('/(\.(png|jpg|jpeg|gif))/', '-'.$source['name'].'$1', $url);
            if (!empty($source['min_width'])) {
                $media = sprintf(' media="(min-width: %dpx)"', $source['min_width']);
            }
            $html .= sprintf('<source srcset="%s%s"%s>', $sourceUrl, $twoxString, $media);
            if ($source['default']) {
                $default = $source;
            }
        }
        $html .= '<!--[if IE 9]></video><![endif]-->';

        if ($default) {
            if ($source['has2x']) {
                $twoxSourceUrl = preg_replace('/(\.(png|jpg|jpeg|gif))/', '-'.$source['name'].'@2x$1', $url);
                $twoxString = sprintf(', %s 2x', $twoxSourceUrl);
            }
            $sourceUrl = preg_replace('/(\.(png|jpg|jpeg|gif))/', '-'.$source['name'].'$1', $url);
            $html .= sprintf('<img srcset="%s%s" alt="%s">', $sourceUrl, $twoxString, $alt);
        }
        $html .= '</picture>';

        return $html;
    }

    public function getName()
    {
        return 'florian_ec_twig_picture';
    }
}
