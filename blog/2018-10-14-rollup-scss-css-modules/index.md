---
title: Bundle Libraries With SCSS and CSS Modules Using Rollup
date: 2018-10-14T18:00:00.000Z
category: Development
tags: [ javascript, react, sass, css modules, rollup ]
description: In this article I am going to explain how to bundle a library (eg, of React components) with SCSS and CSS Modules using Rollup.
path: /rollup-scss-css-modules/
published: true
---

[CSS Modules](https://github.com/css-modules/css-modules) are a great way to locally scope CSS to a specific component. Unlike with some CSS-in-JS solutions you are writing normal CSS and then import it in your component. For example,

```css
/* Button.css */
.button {
    background: teal;
    color: white;
}
```

```javascript
// Button.js
import React from 'react';
import css from './Button.css';

export default ({ children }) => (
    <button className={css.button}>{children}</button>
);
```

When building your application the generated CSS would look like this:

```css
.Button_button__3_Ozh {
    background: coral;
    color: white;
}
```

This also works with Sass and SCSS files and there is a lot of documentation on how to set up [SCSS and CSS Modules with Webpack](https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9). However, recently I wanted to use SCSS and CSS Modules in a library project which is bundled using [Rollup](https://rollupjs.org/guide/en).

I knew that people are using this combination of technologies and I even found some sample projects for this technology stack, but at first I couldn't figure out what they did in their configuration to make it work. The thing that I was missing was that [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss) also supports Sass and I just need to enable both modules and Sass to make everything work.

Here is my final configuration:

```javascript
// rollup.config.js
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: './src/index.js',

  output: [
    {
      name: 'comlib',
      sourcemap: true,
      file: './dist/index.js',
      format: 'umd',
      globals: { react: 'React' },
    },
  ],

  plugins: [
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
  ],

  external: ['react', 'react-dom'],
};
```

Everything in this configuration is pretty standard, except for the PostCSS configuration:

- `modules: true` enables CSS modules for the bundle.
- `use: ['sass']` tells the plugin to enable Sass support. You also need to install `node-sass` explicitly in the project
- `extract: false` keeps the CSS in the JavaScript file. If you want to generate a separate CSS file you can set `extract` to `true` and Rollup would build a `index.css` file which is also put in the projects `dist/` directory.

## Sources

- [CSS Modules](https://github.com/css-modules/css-modules)
- [Making of a component library for React](https://hackernoon.com/making-of-a-component-library-for-react-e6421ea4e6c7)
- [How I set-up a React component library with Rollup](https://medium.com/tech-grandata-com/how-i-set-up-a-react-component-library-with-rollup-be6ccb700333)
- [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss)
