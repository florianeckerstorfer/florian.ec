---
permalink: blog/eleventy-and-responsive-images/
title: Eleventy and Responsive Images
date: 2020-10-12
category: Development
tags: [eleventy, remark]
description: I have created a remark plugin called @fec/remark-images that can be used with Eleventy to automatically generate responsive images.
---
Trailer: I have created a plugin to generate responsive images on an Eleventy site by using [remark](https://remark.js.org) and [eleventy-plugin-remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark). The plugin is called [@fec/remark-images](#) and currently it can generate multiple versions of an image and insert the correct markup in your Eleventy site.

## Origin Story

When I switched from [Gatsby](https://www.gatsbyjs.com) to [Eleventy](https://www.11ty.dev) last year, the one thing that I missed in Eleventy was how Gatsby handles images. The [gatsby-remark-images](https://www.gatsbyjs.com/plugins/gatsby-remark-images/) plugin does the following things:

> - Adding an elastic container to hold the size of the image while it loads to avoid layout jumps.
> - Generating multiple versions of images at different widths and sets the srcset and sizes of the img element so regardless of the width of the device, the correct image is downloaded.
> - Using the “blur up” technique popularized by Medium and Facebook where a small 20px wide version of the image is shown as a placeholder until the actual image is downloaded.

When I moved from Gatsby to Eleventy I did not find an easy to use these techniques and instead implemented a [Nunjucks shortcode for responsive images](https://github.com/florianeckerstorfer/florian.ec/blob/3a2e714e2c7b8ecc8e942953ab63beb7e640812d/src/shortcodes/responsiveImg.js). This shortcode generates the HTML markup for multiple versions of the image, which I generate using [Gulp](https://github.com/florianeckerstorfer/florian.ec/blob/685d2dd498008e2ad502a71d27287a0081d666ce/gulpfile.js). By separating the image generation and rendering the markup it was fast to implement, but I could not implement the “blur up” technique and setting the size of the image.

## Training Montage

Last year I already created an [Eleventy plugin to replace the markdown-it with remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark) and since Gatsby also uses remark, I thought it should not be too hard to port gatsby-remark-images to work without Gatsby. Because Gatsby invokes remark in a custom way and `gatsby-remark-*` plugins use additional Gatsby-specific packages I needed to rewrite the functionality.

I started with implementing the generation of the responsive image markup. In my post on my trip to Namibia and South Africa I have the following Markdown:

```md
![On the road from Windhoek to Etosha National Park](/blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha.jpg "On the road from Windhoek to Etosha National Park.")
```

Which the plugin turns into:

```html
<figure class="figure">
  <picture class="">
    <source srcset="/blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-960.jpg, /blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-1920.jpg 2x" media="(min-width: 960px)">
    <source srcset="/blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-640.jpg, /blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-1280.jpg 2x, /blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-1920.jpg 3x" media="(min-width: 640px)">
    <img srcset="/blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-320.jpg, /blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-640.jpg 2x, /blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-960.jpg 3x" src="/blog/2019-07-11-namibia-south-africa-photos/001-windhoek-etosha-320.jpg" alt="On the road from Windhoek to Etosha National Park" class="" loading="lazy">
  </picture>
  <figcaption class="figure__caption">On the road from Windhoek to Etosha National Park.</figcaption>
</figure>
```

The next and most important part is the generation of the images. In the example above the original image has a width of 2280 pixels and I need to generate images for my breakpoints (320px, 640px and 960px) in all supported resolutions. When generating images, the plugin tries to be as efficient as possible. It reuses images (eg, 320@2x and 640@1x), never creates images larger than the original and only generates a version if it does not exist or the source has changed since the last generation. I use [sharp](https://github.com/lovell/sharp) to generate the images, which is the fastest image generation library I could find.

## Finale

The result of my work is [@fec/remark-images](https://github.com/florianeckerstorfer/remark-images), which turns the normal image Markdown syntax into fully responsive images, including the generation of the responsive versions of the image. In addition to remark-images you also need remark, remark-html and eleventy-plugin-remark to make this work:

```bash
npm install --save @fec/eleventy-plugin-remark remark remark-html @fec/remark-images
```

Next you need to tell Eleventy to use remark as its Markdown rendering engine and activate @fec/remark-images:

```js
const eleventyRemark = require('@fec/eleventy-plugin-remark');
const remarkImages = require('@fec/remark-images');

eleventyConfig.addPlugin(eleventyRemark, {
  plugins: [{
    plugin: remarkImages,
    options: {
      srcDir: './',
      targetDir: './_site',
    },
  }],
});
```

The plugin has a few [more options](https://github.com/florianeckerstorfer/remark-images#options) to define the image sizes, resolutions and CSS classes that should be added to the generated HTML. 

Over the weekend I have released a couple of versions and already replaced my Nunjucks shortcode and Gulp setup on this site with the plugin.

## Sequels

remark-images currently only handles the generation of the responsive versions and the markup. I plan to implement the missing two techniques from gatsby-remark-images in the next couple of weeks together with some other missing features:

- Adding an elastic container to the markup that acts as a placeholder while the image loads to prevent layout jumps.
- Implementing the “blur up” technique.
- Adding an option to dynamically modify the target path. For example, on this site all posts are in a folder `/blog/YYYY-MM-DD-slug`, but the date is removed so that the target path is `/blog/slug`. However, the images are saved in a folder that still includes the date.
- Adding support for image links, including when the image contains a caption.
- Extend support to HTML-in-Markdown. Since it is legal to put HTML in a Markdown file, the plugin should also process HTML tags that contain an image.

My plan is to implement these five missing features and then release an official v1.0.0. Check out [@fec/remark-images](https://github.com/florianeckerstorfer/remark-images), try it out and give me feedback. I am curious what you think.
