[florian.ec](https://florian.ec)
==========

> This repository contains the source code of my personal website, [florian.ec](https://florian.ec). I am using [Sculpin](https://sculpin.io) to generate static HTML pages, [Sass](http://sass-lang.com) to style it and [Gulp](http://gulpjs.com) to build it.


Usage
-----

This section exists because there may exist a point in the future where I can't remember how to build this site.

### Build for Development

```shell
gulp build
make dev
```

There also exists a `watch` mode to automatically execute the required tasks whenever the source changes.

```shell
gulp watch
```

### Build for Production

```shell
make prod
```

The `responsive_images` Grunt tasks creates responsive images.

### Deployment

```
make deploy
```

*I just hope that future-me still has the appropriate SSH keys.*
