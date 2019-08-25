"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _feed = require("feed");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _internals = require("./internals");

var undefIfFalse = function undefIfFalse(value) {
  return value !== false ? value : undefined;
};

function addItemToPage(feed, siteMetadata, options) {
  return function (page) {
    feed.addItem({
      title: page.frontmatter.title,
      id: "" + siteMetadata.siteUrl + page.fields.slug,
      link: "" + siteMetadata.siteUrl + page.fields.slug,
      date: (0, _dayjs.default)(page.frontmatter.date).toDate(),
      content: page.html,
      author: [{
        name: options.author || siteMetadata.author,
        email: undefIfFalse(options.email || siteMetadata.email),
        link: options.link || siteMetadata.siteUrl
      }]
    });
  };
}

function buildFeed(pages, siteMetadata, options, output) {
  var feed = new _feed.Feed({
    title: options.title || siteMetadata.title,
    description: options.description || siteMetadata.description,
    link: options.link || siteMetadata.siteUrl,
    id: options.id || siteMetadata.siteUrl,
    copyright: options.copyright || "All rights reserved " + new Date().getUTCFullYear() + ", " + siteMetadata.author,
    feedLinks: {
      atom: siteMetadata.siteUrl + "/" + output.atom,
      rss2: siteMetadata.siteUrl + "/" + output.rss2,
      json: siteMetadata.siteUrl + "/" + output.json
    },
    author: {
      name: options.author || siteMetadata.author,
      email: undefIfFalse(options.email || siteMetadata.email)
    }
  });
  pages.map(function (page) {
    return page.node;
  }).forEach(addItemToPage(feed, siteMetadata, options));
  feed.addContributor({
    name: siteMetadata.author,
    email: siteMetadata.email,
    link: siteMetadata.siteUrl
  });
  return feed;
}

function generateAtomFeed(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.atom1());
}

function generateRSSFeed(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.rss2());
}

function generateJSONFeed(feed, name) {
  return _fs.default.writeFileSync("./public/" + name, feed.json1());
}

function generateFeed(_x, _x2) {
  return _generateFeed.apply(this, arguments);
}

function _generateFeed() {
  _generateFeed = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref, feedOptions) {
    var graphql, output, options, result, posts, siteMetadata, feed;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            graphql = _ref.graphql;
            output = (0, _extends2.default)({}, _internals.defaultOptions.output, {}, feedOptions.output);
            options = (0, _extends2.default)({}, _internals.defaultOptions, {}, feedOptions);
            _context2.next = 5;
            return graphql("\n    {\n      site {\n        siteMetadata {\n          title\n          description\n          author\n          email\n          siteUrl\n        }\n      }\n      allMarkdownRemark(\n        filter: { fileAbsolutePath: { regex: \"" + options.match + "\" } }\n        sort: { fields: [frontmatter___date], order: DESC }\n        limit: " + options.limit + "\n      ) {\n        edges {\n          node {\n            fields {\n              slug\n            }\n            frontmatter {\n              title\n              date\n            }\n            html\n          }\n        }\n      }\n    }\n  ");

          case 5:
            result = _context2.sent;

            if (!result.errors) {
              _context2.next = 8;
              break;
            }

            throw result.errors;

          case 8:
            posts = result.data.allMarkdownRemark.edges;
            siteMetadata = result.data.site.siteMetadata;
            feed = buildFeed(posts, siteMetadata, options, output);
            generateAtomFeed(feed, output.atom);
            generateRSSFeed(feed, output.rss2);
            generateJSONFeed(feed, output.json);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _generateFeed.apply(this, arguments);
}

exports.onPostBuild =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref2, pluginOptions) {
    var graphql, i;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref2.graphql;

            if (!(pluginOptions.feeds && !Array.isArray(pluginOptions.feeds))) {
              _context.next = 5;
              break;
            }

            throw new Error('@fec/gatsby-plugin-feed `feeds` option must be an array.');

          case 5:
            if (pluginOptions.feeds) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return generateFeed({
              graphql: graphql
            }, {});

          case 8:
            i = 0;

          case 9:
            if (!(i < pluginOptions.feeds.length)) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return generateFeed({
              graphql: graphql
            }, pluginOptions.feeds[i]);

          case 12:
            i += 1;
            _context.next = 9;
            break;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();