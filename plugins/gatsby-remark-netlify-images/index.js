"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("./constants"),
    DEFAULT_OPTIONS = _require.DEFAULT_OPTIONS,
    imageClass = _require.imageClass,
    imageBackgroundClass = _require.imageBackgroundClass,
    imageWrapperClass = _require.imageWrapperClass;

var visitWithParents = require("unist-util-visit-parents");

var getDefinitions = require("mdast-util-definitions");

var path = require("path");

var queryString = require("query-string");

var isRelativeUrl = require("is-relative-url");

var _ = require("lodash");

var Promise = require("bluebird");

var cheerio = require("cheerio");

var slash = require("slash");

var chalk = require("chalk");

var _require2 = require('./fluid'),
    fluid = _require2.fluid; // If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.


module.exports = function (_ref, pluginOptions) {
  var files = _ref.files,
      markdownNode = _ref.markdownNode,
      markdownAST = _ref.markdownAST,
      pathPrefix = _ref.pathPrefix,
      getNode = _ref.getNode,
      reporter = _ref.reporter,
      cache = _ref.cache,
      compiler = _ref.compiler;

  var options = _.defaults(pluginOptions, {
    pathPrefix: pathPrefix
  }, DEFAULT_OPTIONS);

  var findParentLinks = function findParentLinks(_ref2) {
    var children = _ref2.children;
    return children.some(function (node) {
      return node.type === "html" && !!node.value.match(/<a /) || node.type === "link";
    });
  }; // Get all the available definitions in the markdown tree


  var definitions = getDefinitions(markdownAST); // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)

  var rawHtmlNodes = [];
  visitWithParents(markdownAST, ["html", "jsx"], function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    rawHtmlNodes.push({
      node: node,
      inLink: inLink
    });
  }); // This will only work for markdown syntax image tags

  var markdownImageNodes = [];
  visitWithParents(markdownAST, ["image", "imageReference"], function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    markdownImageNodes.push({
      node: node,
      inLink: inLink
    });
  });

  var getImageInfo = function getImageInfo(uri) {
    var _queryString$parseUrl = queryString.parseUrl(uri),
        url = _queryString$parseUrl.url,
        query = _queryString$parseUrl.query;

    return {
      ext: path.extname(url).split(".").pop(),
      url: url,
      query: query
    };
  };

  var getImageCaption = function getImageCaption(node, overWrites) {
    var getCaptionString = function getCaptionString() {
      var captionOptions = Array.isArray(options.showCaptions) ? options.showCaptions : options.showCaptions === true ? ["title", "alt"] : false;

      if (captionOptions) {
        for (var _iterator = captionOptions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref3 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref3 = _i.value;
          }

          var option = _ref3;

          switch (option) {
            case "title":
              if (node.title) {
                return node.title;
              }

              break;

            case "alt":
              if (overWrites.alt) {
                return overWrites.alt;
              }

              if (node.alt) {
                return node.alt;
              }

              break;
          }
        }
      }

      return "";
    };

    var captionString = getCaptionString();

    if (!options.markdownCaptions || !compiler) {
      return _.escape(captionString);
    }

    return compiler.generateHTML(compiler.parseString(captionString));
  }; // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image


  var generateImagesAndUpdateNode =
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(node, resolve, inLink, overWrites) {
      var imagePath, fluidSizes, srcSet, originalImg, fallbackSrc, presentationWidth, srcSplit, fileName, fileNameNoExt, defaultAlt, sizes, alt, title, loading, imageTag, imageCaption, rawHTML;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (overWrites === void 0) {
                overWrites = {};
              }

              imagePath = node.url;

              if (imagePath) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", resolve());

            case 4:
              fluidSizes = [options.maxWidth];
              fluidSizes.push(options.maxWidth / 4);
              fluidSizes.push(options.maxWidth / 2);
              fluidSizes.push(options.maxWidth * 1.5);
              fluidSizes.push(options.maxWidth * 2);
              srcSet = fluidSizes.map(function (size) {
                return Math.round(size);
              }).map(function (size) {
                return imagePath + "?nf_resize=fit&w=" + size + " " + size + "w";
              }).join(",\n");
              originalImg = imagePath;
              fallbackSrc = imagePath;
              presentationWidth = options.maxWidth; // Generate default alt tag

              srcSplit = getImageInfo(node.url).url.split("/");
              fileName = srcSplit[srcSplit.length - 1];
              fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
              defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, " ");
              sizes = "(max-width: " + presentationWidth + "px) 100vw, " + presentationWidth + "px";
              alt = _.escape(overWrites.alt ? overWrites.alt : node.alt ? node.alt : defaultAlt);
              title = node.title ? _.escape(node.title) : alt;
              loading = options.loading;

              if (!["lazy", "eager", "auto"].includes(loading)) {
                reporter.warn(reporter.stripIndent("\n          " + chalk.bold(loading) + " is an invalid value for the " + chalk.bold("loading") + " option. Please pass one of \"lazy\", \"eager\" or \"auto\".\n        "));
              } // Create our base image tag


              imageTag = ("\n        <img\n          class=\"" + imageClass + "\"\n          alt=\"" + alt + "\"\n          title=\"" + title + "\"\n          src=\"" + fallbackSrc + "\"\n          srcset=\"" + srcSet + "\"\n          sizes=\"" + sizes + "\"\n          loading=\"" + loading + "\"\n        />\n      ").trim(); // Construct new image node w/ aspect ratio placeholder

              imageCaption = options.showCaptions && getImageCaption(node, overWrites);
              rawHTML = ("" + imageTag).trim(); // Make linking to original image optional.

              if (!inLink && options.linkImagesToOriginal) {
                rawHTML = ("\n    <a\n      class=\"gatsby-resp-image-link\"\n      href=\"" + originalImg + "\"\n      style=\"display: block\"\n      target=\"_blank\"\n      rel=\"noopener\"\n    >\n      " + rawHTML + "\n    </a>\n      ").trim();
              }

              rawHTML = ("\n      <span\n        class=\"" + imageWrapperClass + "\"\n        style=\"position: relative; display: block; margin-left: auto; margin-right: auto; max-width: " + presentationWidth + "px;\"\n      >\n        " + rawHTML + "\n      </span>\n      ").trim(); // Wrap in figure and use title as caption

              if (imageCaption) {
                rawHTML = ("\n    <figure class=\"gatsby-resp-image-figure\">\n      " + rawHTML + "\n      <figcaption class=\"gatsby-resp-image-figcaption\">" + imageCaption + "</figcaption>\n    </figure>\n        ").trim();
              }

              return _context.abrupt("return", rawHTML);

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function generateImagesAndUpdateNode(_x, _x2, _x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  return Promise.all( // Simple because there is no nesting in markdown
  markdownImageNodes.map(function (_ref5) {
    var node = _ref5.node,
        inLink = _ref5.inLink;
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref6 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(resolve, reject) {
        var overWrites, refNode, fileType, rawHTML;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                overWrites = {};

                if (!(!node.hasOwnProperty("url") && node.hasOwnProperty("identifier"))) {
                  _context2.next = 7;
                  break;
                }

                //consider as imageReference node
                refNode = node;
                node = definitions(refNode.identifier); // pass original alt from referencing node

                overWrites.alt = refNode.alt;

                if (node) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", resolve());

              case 7:
                fileType = getImageInfo(node.url).ext; // Ignore gifs as we can't process them,
                // svgs as they are already responsive by definition

                if (!(isRelativeUrl(node.url) && fileType !== "gif" && fileType !== "svg")) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 11;
                return generateImagesAndUpdateNode(node, resolve, inLink, overWrites);

              case 11:
                rawHTML = _context2.sent;

                if (rawHTML) {
                  // Replace the image or ref node with an inline HTML node.
                  if (refNode) {
                    node = refNode;
                  }

                  node.type = "html";
                  node.value = rawHTML;
                }

                return _context2.abrupt("return", resolve(node));

              case 16:
                return _context2.abrupt("return", resolve());

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }());
  })).then(function (markdownImageNodes) {
    return (// HTML image node stuff
      Promise.all( // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(function (_ref7) {
        var node = _ref7.node,
            inLink = _ref7.inLink;
        return new Promise(
        /*#__PURE__*/
        function () {
          var _ref8 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee3(resolve, reject) {
            var $, imageRefs, _i2, _imageRefs, thisImg, formattedImgTag, fileType, rawHTML;

            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (node.value) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 2:
                    $ = cheerio.load(node.value);

                    if (!($("img").length === 0)) {
                      _context3.next = 5;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 5:
                    imageRefs = [];
                    $("img").each(function () {
                      imageRefs.push($(this));
                    });
                    _i2 = 0, _imageRefs = imageRefs;

                  case 8:
                    if (!(_i2 < _imageRefs.length)) {
                      _context3.next = 29;
                      break;
                    }

                    thisImg = _imageRefs[_i2];
                    // Get the details we need.
                    formattedImgTag = {};
                    formattedImgTag.url = thisImg.attr("src");
                    formattedImgTag.title = thisImg.attr("title");
                    formattedImgTag.alt = thisImg.attr("alt");

                    if (formattedImgTag.url) {
                      _context3.next = 16;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 16:
                    fileType = getImageInfo(formattedImgTag.url).ext; // Ignore gifs as we can't process them,
                    // svgs as they are already responsive by definition

                    if (!(isRelativeUrl(formattedImgTag.url) && fileType !== "gif" && fileType !== "svg")) {
                      _context3.next = 26;
                      break;
                    }

                    _context3.next = 20;
                    return generateImagesAndUpdateNode(formattedImgTag, resolve, inLink);

                  case 20:
                    rawHTML = _context3.sent;

                    if (!rawHTML) {
                      _context3.next = 25;
                      break;
                    }

                    // Replace the image string
                    thisImg.replaceWith(rawHTML);
                    _context3.next = 26;
                    break;

                  case 25:
                    return _context3.abrupt("return", resolve());

                  case 26:
                    _i2++;
                    _context3.next = 8;
                    break;

                  case 29:
                    // Replace the image node with an inline HTML node.
                    node.type = "html";
                    node.value = $("body").html(); // fix for cheerio v1

                    return _context3.abrupt("return", resolve(node));

                  case 32:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x7, _x8) {
            return _ref8.apply(this, arguments);
          };
        }());
      })).then(function (htmlImageNodes) {
        return markdownImageNodes.concat(htmlImageNodes).filter(function (node) {
          return !!node;
        });
      })
    );
  });
};