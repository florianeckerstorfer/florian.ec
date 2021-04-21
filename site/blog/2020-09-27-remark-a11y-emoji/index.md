---
permalink: blog/remark-a11y-emoji/
title: '@fec/remark-a11y-emoji v2.0.0 released'
date: 2020-09-27
category: Development
tags: [javascript, remark, emoji]
description: I released v2.0.0 of my Remark plugin to Accessibility descriptions to Emoji
---

Last year I created a plugin for Remark to add accessible descriptions to Emoji: [@fec/remark-a11y-emoji](https://github.com/florianeckerstorfer/remark-a11y-emoji). Today I'm happy to announce that I released version 2.0.0.

The main new feature is support for skin colors: ✌🏿✌🏾✌🏽✌🏼✌🏻. Many thanks to [Amira Hailemariam](https://github.com/amirahaile) for providing the pull request with this feature.

In addition I added a real build process, switch to using `import`, updated all dependencies and bumped the minimum node version to v10.x.

You can install the library with:

```bash
npm install -S @fec/remark-a11y-emoji
```

Then you can use the plugin with Remark:

```javascript
import remark from 'remark';
import a11yEmoji from '@fec/remark-a11y-emoji';

const processor = remark().use(a11yEmoji);
```
