---
permalink: blog/cache-busting-eleventy-postcss/
title: Cache Busting with Eleventy and PostCSS
date: 2021-02-20
category: Development
tags: [eleventy, postcss, caching]
description: This article describes a simple technique to add cache busting to a site that uses Eleventy and PostCSS
---

Last night I was fixing a few CSS bugs on this site and after deploying them I noticed that the changes were not visible yet. I forgot to implement some kind of cache busting on this site 🤦‍♂️

The best practice for caching CSS assets in recent years has been to set a pretty high cache time for these files and to bust the cache by changing the filename when the content changes. Most commonly a hash of the content is used as part of the filename. Tools like [Webpack](https://webpack.js.org) or [Parcel](https://parceljs.org) will do this automatically, but for this site I decided to not use any kind of bundler and instead use [PostCSS](https://postcss.org) directly to transpile my CSS. By invoking PostCSS through an [JavaScript template in Eleventy](https://www.11ty.dev/docs/languages/javascript/) I am avoiding having another command I need to run when I want to build the site.

To implement cache busting I need three things:

1. A method that takes a directory of CSS files and returns a hash of content of all files in this directory.
2. A way to include the content hash in the filename when writing the transformed CSS.
3. The filename with the content hash in the template that references the stylesheet in the HTML.

## Generating a content hash

Generating a content hash is pretty straight forward: first I read all the files in the given directory, concatenate them into a single string and then use a hashing function to generate a hash.

```javascript
// src/lib/generateCssHash.js

const fs = require('fs');
const glob = require('fast-glob');
const md5 = require('md5');

function generateCssHash(dir) {
  const cssFiles = glob.sync([`${dir}/**/*.css`]);
  const cssContent = cssFiles
    .map((cssFile) => fs.readFileSync(cssFile))
    .join('');
  return md5(cssContent).slice(0, 8);
}

module.exports = generateCssHash;
```

I'm using the [fast-glob](https://github.com/mrmlnc/fast-glob#readme) library to find all the CSS files since it is already a dependency of Eleventy and [md5](https://github.com/pvorb/node-md5#readme) as my hashing function.

## Adding the content hash to the CSS filename

Before adding cache busting my script to run PostCSS looked like this:

```javascript
// src/css/styles.11ty.js

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  async data() {
    const cssDir = path.join(__dirname, '..', 'includes', 'postcss');
    const rawFilepath = path.join(cssDir, 'styles.css');

    return {
      permalink: `css/styles.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([require('postcss-import')])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
```

JavaScript templates can contain a class, the `render()` method generates the content of the file, while the `data()` method provides the frontmatter. We need to update the `permalink` property of the frontmatter to give Eleventy a filename that includes a hash of the content.

```javascript
// src/css/styles.11ty.js

// ...
const generateCssHash = require('../lib/generateCssHash');

module.exports = class {
  async data() {
    const cssDir = path.join(__dirname, '..', 'includes', 'postcss');
    //...
    return {
      permalink: `css/styles.${generateCssHash(cssDir)}.css`,
      // ..
    };
  }
  // ...
```

## Referencing the hashed CSS file in HTML

We now have a CSS file with the content hash in its filename, but we need the hash also inside our HTML template to reference it inside the `<link>` tag. For this step my solution is different than most of the examples I've found, because I decided to transpile my CSS with a JavaScript template instead of invoking PostCSS in a build step before building Eleventy. For example, in [this article](https://brycewray.com/posts/2020/12/hashing-out-cache-busting-fix-eleventy/) (or [this one](https://codsen.com/articles/our-cache-busting-setup-on-eleventy/)) the idea is to save the newly generated hash into a file after running PostCSS and then read this file in Eleventy.

This technique doesn't work for my setup, because PostCSS is run as a JavaScript template and I can't be sure that this code is executed before the hashed filename is required in the HTML pages. Luckily, the solution is quite simple: in a Eleventy [Data File](https://www.11ty.dev/docs/data-js/) I run the function that generates the content hash again. The content of the CSS files does not change, reading all CSS files, concatenating and hashing them does not take a noticeable amount of time and the hashing algorithm is deterministic.

For a programmer reading a bunch of files and then executing an hashing algorithm twice sounds like a waste, but in this case it makes no difference, Eleventy build already reads and writes hundreds of images, reading a dozen CSS files does not impact the build time in any way. The other plus point is that the code is straight forwards:

```javascript
// src/data/css.js

const path = require('path');
const generateCssHash = require('../lib/generateCssHash');

const cssDir = path.join(__dirname, '..', 'includes', 'postcss');
const hash = generateCssHash(cssDir);

module.exports = {
  stylesCss: `/css/styles.${hash}.css`,
};
```

This is an Eleventy Data File and I can access the values in any Eleventy template by `[filename].[varName]`. I need the name of the generated CSS file in my main template and there I can link it like this:

```html
<!-- src/includes/layouts/layout.njk -->
<link rel="stylesheet" href="{{"{{ css.stylesCss }}"}}" />
```

Done. When I started thinking about adding cache busting I thought that this maybe will get overly complicated, but in reality it works very nicely, does only need one additional dependency and does not effect the performance of the build script and dev server in any noticeable way.
