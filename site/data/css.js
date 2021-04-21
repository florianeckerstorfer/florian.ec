const path = require('path');
const generateCssHash = require('../src/lib/generateCssHash');

const cssDir = path.join(__dirname, '..', 'src', 'css');
const hash = generateCssHash(cssDir);

module.exports = {
  stylesCss: `/css/styles.${hash}.css`,
};
