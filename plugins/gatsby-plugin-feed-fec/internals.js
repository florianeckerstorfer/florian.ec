'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = exports.runQuery = exports.writeFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writeFile = exports.writeFile = (0, _pify2.default)(_fs2.default.writeFile);

var runQuery = exports.runQuery = function runQuery(handler, query) {
  return handler(query).then(function (r) {
    if (r.errors) {
      throw new Error(r.errors.join(', '));
    }

    return r.data;
  });
};

var defaultOptions = exports.defaultOptions = {
  // Generator name
  generator: 'GatsbyJS',
  rss: true,
  json: true,
  siteQuery: '\n    {\n      site {\n        siteMetadata {\n          title\n          description\n          siteUrl\n          author\n        }\n      }\n    }\n  ',

  feedQuery: '\n      {\n        allMarkdownRemark(\n          sort: {order: DESC, fields: [frontmatter___date]}, \n          limit: 100, \n          \n          ) {\n          edges {\n            node {\n              html\n              frontmatter {\n                date\n                path\n                title\n              }\n            }\n          }\n        }\n      }\n      '
};