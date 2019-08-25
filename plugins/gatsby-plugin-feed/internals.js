"use strict";

exports.__esModule = true;
exports.defaultOptions = void 0;
var defaultOptions = {
  createLinkInHead: true,
  author: undefined,
  copyright: undefined,
  description: undefined,
  email: false,
  id: undefined,
  link: undefined,
  title: undefined,
  limit: 10,
  match: '^/blog/',
  output: {
    rss2: 'rss.xml',
    atom: 'atom.xml',
    json: 'feed.json'
  }
};
exports.defaultOptions = defaultOptions;