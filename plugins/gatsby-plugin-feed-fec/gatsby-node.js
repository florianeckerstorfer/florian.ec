'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rss = require('rss');

var _rss2 = _interopRequireDefault(_rss);

var _internals = require('./internals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var publicPath = './public';

var buildFeed = function buildFeed() {};

exports.onPostBuild = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2, pluginOptions) {
    var graphql = _ref2.graphql;

    var options, siteQuery, _siteQuery$site$siteM, title, description, siteUrl, author, feedQuery, data, items, jsonFeed, rssFeed, rss;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            delete pluginOptions.plugins;
            options = _extends({}, _internals.defaultOptions, pluginOptions);
            _context.next = 4;
            return (0, _internals.runQuery)(graphql, options.siteQuery);

          case 4:
            siteQuery = _context.sent;
            _siteQuery$site$siteM = siteQuery.site.siteMetadata, title = _siteQuery$site$siteM.title, description = _siteQuery$site$siteM.description, siteUrl = _siteQuery$site$siteM.siteUrl, author = _siteQuery$site$siteM.author;
            _context.next = 8;
            return (0, _internals.runQuery)(graphql, options.feedQuery);

          case 8:
            feedQuery = _context.sent;
            data = feedQuery.allMarkdownRemark.edges;
            items = data.map(function (i) {
              var _i$node = i.node,
                  html = _i$node.html,
                  frontmatter = _i$node.frontmatter;


              var slug = frontmatter.path || frontmatter.slug || frontmatter.url;
              return {
                id: _path2.default.join(siteUrl, slug),
                url: _path2.default.join(siteUrl, slug),
                title: frontmatter.title,
                date_published: new Date(frontmatter.date).toISOString(),
                date_modified: new Date(frontmatter.date).toISOString(),
                content_html: html
              };
            });

            if (!options.json) {
              _context.next = 16;
              break;
            }

            console.log('Generating JSON feed');
            jsonFeed = {
              version: 'https://jsonfeed.org/version/1',
              title: title,
              description: description,
              home_page_url: siteUrl,
              feed_url: _path2.default.join(siteUrl, 'feed.json'),
              user_comment: 'This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — https://markmichon.com/feed.json — and add it your reader.',
              favicon: _path2.default.join(siteUrl, 'favicon.png'),
              author: {
                name: author
              },
              items: items
            };
            _context.next = 16;
            return (0, _internals.writeFile)(_path2.default.join(publicPath, 'feed.json'), JSON.stringify(jsonFeed), 'utf8').catch(function (r) {
              console.log('Failed to write JSON Feed file: ', r);
            });

          case 16:
            if (!options.rss) {
              _context.next = 23;
              break;
            }

            console.log('Generating RSS feed');
            rssFeed = new _rss2.default({
              title: title,
              description: description,
              feed_url: siteUrl + '/feed.rss',
              site_url: siteUrl,
              image_url: siteUrl + '/favicon.png'
            });


            items.forEach(function (i) {
              rssFeed.item({
                title: i.title,
                description: i.content_html,
                url: i.url,
                guid: i.url,
                author: author,
                date: i.date_published
              });
            });

            rss = rssFeed.xml();
            _context.next = 23;
            return (0, _internals.writeFile)(_path2.default.join(publicPath, 'feed.xml'), rss, 'utf8').catch(function (r) {
              console.log('Failed to write RSS Feed File:', r);
            });

          case 23:
            return _context.abrupt('return', Promise.resolve());

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();