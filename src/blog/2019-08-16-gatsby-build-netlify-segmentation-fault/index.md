---
permalink: blog/gatsby-build-netlify-segmentation-fault/index.html
title: Segmentation fault when building Gatsby on Netlify
date: 2019-08-16
category: Development
tags: [gatsby, netlify, sharp]
description: Gatsby build fails on Netlify because of a segmentation fault while processing images with `sharp`
---

Yesterday evening I was switching this site from manual deploys to Git-based deploys, but the Gatsby build always failed because of a segmentation fault:

```shell
11:19:12 PM: (sharp:1509): GLib-GObject-WARNING **: 21:19:12.143: gtype.c:4265: type id '0' is invalid
11:19:12 PM: (sharp:1509): GLib-GObject-WARNING **: 21:19:12.143: can't peek value table for type '<invalid>' which is not currently referenced
11:19:12 PM: (sharp:1509): GLib-GObject-WARNING **: 21:19:12.143: gvalue.c:188: cannot initialize GValue with type '(null)', this type has no GTypeValueTable implementation
11:19:18 PM: /usr/local/bin/build: line 34:  1509 Segmentation fault      (core dumped) gatsby build
```

In the log from Netlify we can see that segmentation fault happens in sharp, a library to process images. I never had problems with sharp in the past, but after some searching I found [a Github issue](https://github.com/gatsbyjs/gatsby/issues/6291) and sharp crashes sometimes when processing large amounts of images.

In [a comment](https://github.com/gatsbyjs/gatsby/issues/6291#issuecomment-505097465) in the aforementioned issue I also found the solution for my problem. Add the following to your `gatsby-node.js`:

```javascript
const sharp = require('sharp');

sharp.cache(false);
sharp.simd(false);
```

The two lines disable caching and SIMD instructions, the later provides performance benefits, but [sometimes causes sharp to segfault](https://github.com/gatsbyjs/gatsby/issues/6291#issuecomment-465008389).

If you are reading this, the build now works correctly.
