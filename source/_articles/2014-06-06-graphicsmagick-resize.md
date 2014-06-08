---
title: Resize images with GraphicsMagick
tags: [ graphicsmagick, image ]
slug: graphicsmagick-resize
---
{% block content %}

I just searched 15 minutes to find out how to resize a image using [GraphicsMagick](http://www.graphicsmagick.org).

<pre><code class="shell">gm convert -resize 150x100 in.jpg out.jpg</code></pre>

This will resize the image <code>in.jpg</code> to 150x100 and saves the result in <code>out.jpg</code>. You can resize the image by either providing the width or the height:

<pre><code class="shell">gm convert -resize 150 in.jpg out.jpg
gm convert -resize x100 in.jpg out.jpg</code></pre>

{% endblock %}
