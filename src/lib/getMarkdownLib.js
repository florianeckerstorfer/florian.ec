let markdownIt = require('markdown-it');

function getMarkdownLib() {
  let options = {
    html: true,
  };
  return markdownIt(options).use(require('markdown-it-anchor'));
}

module.exports = getMarkdownLib;
