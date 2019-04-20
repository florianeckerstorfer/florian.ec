---
slug: /gatsby-a11y-remark-emoji
title: Accessible Emojis with Gatsby
date: 2018-05-03T23:00:00.000Z
category: Development
tags: [gatsby, a11y, emoji]
description: I made a plugin for Gatsby to add A11y tags to Emojis in Markdown.
---

Everyone loves emoji 💯🎉🔥, but if you use [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) to check the accessibility of your JSX you probably know that emoji need special handling to become accessible. Instead of just writing the emoji, you need to wrap it in a `span` and add `role="img"` and `aria-labelledby` attributes.

```jsx
<span role="img" aria-label="guitar">
  🎸
</span>
```

When writing blog posts in Markdown I don't want to wrap every emoji in a `<span>` and therefore I created a plugin for Gatsby to automatically wrap emoji with the correct label. The plugin is called _gatsby-remark-a11y-emoji_ and uses [gemoji](https://github.com/wooorm/gemoji) to find the label for an emoji.

You can install the plugin now using NPM or Yarn:

```shell
npm install --save gatsby-remark-a11y-emoji
```

Then you need to add the plugin to `gatsby-config.js` as a plugin to `gatsby-transformer-remark`. I recommend adding it at the very end of the list, because the plugin transforms Remark _text_ nodes into _html_ nodes.

```js
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // ...
          'gatsby-remark-a11y-emoji',
        ],
      },
    },
  ],
};
```

You can also find the project on [Github](https://github.com/florianeckerstorfer/gatsby-remark-a11y-emoji) and [NPM](https://www.npmjs.com/package/gatsby-remark-a11y-emoji).
