[florian.ec](https://florian.ec)
==========

> This repository contains the source code of my personal website, [florian.ec](https://florian.ec). I am using [Sculpin](https://sculpin.io) to generate static HTML pages, [Sass](http://sass-lang.com) to style it and [Grunt](http://gruntjs.com) to build it.


Usage
-----

This section exists because there may exist a point in the future where I can't remember how to build this site.

### Build for Development

```shell
grunt build:dev
```

The development builds include the [LiveReload](http://livereload.com) and [HTMLInspector](https://github.com/philipwalton/html-inspector) JavaScript snippets.

There also exists a `watch` mode to automatically execute the required tasks whenever the source changes.

```shell
grunt watch
```

### Build for Production

```shell
grunt build:prod
```

The `responsive_images` Grunt tasks creates responsive images.

### Deployment

```
make d
```

*I just hope that future-me still has the appropriate SSH keys.*
