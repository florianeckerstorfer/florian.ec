const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const generateCssHash = require('../src/lib/generateCssHash');

module.exports = class {
  async data() {
    const cssDir = path.join(__dirname, '..', 'src', 'includes', 'postcss');
    const rawFilepath = path.join(cssDir, 'styles.css');
    const hash = generateCssHash(cssDir);

    return {
      permalink: `css/styles.${hash}.css`,
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