---
permalink: blog/eleventy-plugin-remark/
title: '@fec/eleventy-plugin-remark v2.0.0 released'
date: 2020-10-04
category: Development
tags: [javascript, remark, eleventy]
description: I released @fec/eleventy-plugin-remark v2.0.0
---

The funny thing about [semantic versioning](https://semver.org) is that even a small update can release in a major version increase. Yesterday I created a new release of [@fec/eleventy-plugin-remark](https://github.com/florianeckerstorfer/eleventy-plugin-remark) and since it bumps the minimum version from Node 8 to Node 10 its version number also increased from 1.0.2 to 2.0.0.

New in 2.0.0 is the ability to pass options to remark plugins. For example,

```javascript
// .eleventy.js
const eleventyRemark = require('@fec/eleventy-plugin-remark');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyRemark, {
    plugins: [
      {
        plugin: 'remark-emoji',
        options: {
          padSpaceAfter: true,
          emoticon: true,
        },
      },
    ],);
  return {};
};
```

You can install @fec/eleventy-plugin-remark with NPM or Yarn:

```bash
npm install -D @fec/eleventy-plugin-remark remark remark-html
yarn add --dev @fec/eleventy-plugin-remark remark remark-html
```

Thanks to [Sergio Flores](https://github.com/byoigres) for providing the [pull request that added this feature](https://github.com/florianeckerstorfer/eleventy-plugin-remark/pull/35).
