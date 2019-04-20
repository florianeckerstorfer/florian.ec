---
slug: /graphicsmagick-resize
title: Resize images with GraphicsMagick
date: 2014-06-06
category: Automation
tags: [graphicsmagick, image]
---

I just searched 15 minutes to find out how to resize a image using [GraphicsMagick](http://www.graphicsmagick.org).

```shell
gm convert -resize 150x100 in.jpg out.jpg
```

This will resize the image `in.jpg` to 150x100 and saves the result in `out.jpg`. You can resize the image by either providing the width or the height:

```shell
gm convert -resize 150 in.jpg out.jpg
gm convert -resize x100 in.jpg out.jpg
```
