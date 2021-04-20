const path = require('path');
const generateCssHash = require('../lib/generateCssHash');

const cssDir = path.join(__dirname, '..', 'includes', 'postcss');
const hash = generateCssHash(cssDir);

module.exports = {
  stylesCss: `/css/styles.${hash}.css`,
};
