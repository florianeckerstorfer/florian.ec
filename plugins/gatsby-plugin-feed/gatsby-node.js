"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fs = _interopRequireDefault(require("fs"));

var _feed = require("feed");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _internals = require("./internals");

var buildFeed = function buildFeed(pages, siteMetadata, output) {
  var feed = new _feed.Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    link: siteMetadata.siteUrl,
    id: siteMetadata.siteUrl,
    copyright: "All rights reserved " + new Date().getUTCFullYear() + ", " + siteMetadata.author,
    feedLinks: {
      atom: siteMetadata.siteUrl + "/" + output.atom,
      json: siteMetadata.siteUrl + "/" + output.json
    },
    author: {
      name: siteMetadata.author,
      email: siteMetadata.email
    }
  });
  pages.map(function (page) {
    return page.node;
  }).sort(function (a, b) {
    return (0, _dayjs.default)(a.frontmatter.date).isBefore((0, _dayjs.default)(b.frontmatter.date)) ? -1 : 1;
  }).reverse().slice(0, 10).forEach(function (page) {
    feed.addItem({
      title: page.frontmatter.title,
      id: "" + siteMetadata.siteUrl + page.fields.slug,
      link: "" + siteMetadata.siteUrl + page.fields.slug,
      date: (0, _dayjs.default)(page.frontmatter.date).toDate(),
      content: page.html,
      author: [{
        name: siteMetadata.author,
        email: siteMetadata.email,
        link: siteMetadata.siteUrl
      }]
    });
  });
  feed.addContributor({
    name: siteMetadata.author,
    email: siteMetadata.email,
    link: siteMetadata.siteUrl
  });
  return feed;
};

var generateAtomFeed = function generateAtomFeed(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.atom1());
};

var generateRSS = function generateRSS(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.rss2());
};

var generateJSONFeed = function generateJSONFeed(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.json1());
};

exports.onPostBuild = function (_ref, pluginOptions) {
  var graphql = _ref.graphql;
  var output = (0, _extends2.default)({}, _internals.defaultOptions.output, {}, pluginOptions.output);
  graphql("\n    {\n      site {\n        siteMetadata {\n          title\n          description\n          author\n          email\n          siteUrl\n        }\n      }\n      allMarkdownRemark(\n        filter: { fileAbsolutePath: { regex: \"/blog/\" } }\n        sort: { fields: [frontmatter___date], order: DESC }\n        limit: 1000\n      ) {\n        edges {\n          node {\n            fields {\n              slug\n            }\n            frontmatter {\n              slug\n              title\n              date\n            }\n            html\n          }\n        }\n      }\n    }\n  ").then(function (result) {
    if (result.errors) {
      throw result.errors;
    }

    var posts = result.data.allMarkdownRemark.edges;
    var siteMetadata = result.data.site.siteMetadata;
    var feed = buildFeed(posts, siteMetadata, output);
    generateAtomFeed(feed, output.atom);
    generateRSS(feed, output.rss2);
    generateJSONFeed(feed, output.json);
  });
};