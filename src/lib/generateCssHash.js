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
