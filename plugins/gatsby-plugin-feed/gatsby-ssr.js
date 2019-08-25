"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _internals = require("./internals");

var _jsxFileName = "/Users/florian/Projects/florian/florian.ec/plugins/gatsby-plugin-feed/src/gatsby-ssr.js";
// TODO: remove for v3
var withPrefix = _gatsby.withAssetPrefix || _gatsby.withPrefix;

function shouldCreateLinkInHead(option, pathname) {
  if (option === false) {
    return false;
  } else if (option === true) {
    return true;
  }

  console.log('match', new RegExp(option).test(pathname));
  return new RegExp(option).test(pathname);
}

function renderLinksInHead(_ref, feedOptions) {
  var pathname = _ref.pathname,
      setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$feedO = (0, _extends2.default)({}, _internals.defaultOptions, {}, feedOptions),
      createLinkInHead = _defaultOptions$feedO.createLinkInHead;

  var output = (0, _extends2.default)({}, _internals.defaultOptions.output, {}, feedOptions.output);
  console.log('renderLinksInHead', pathname, createLinkInHead);

  if (!shouldCreateLinkInHead(createLinkInHead, pathname)) {
    return;
  }

  if (output.rss2.charAt(0) !== "/") {
    output.rss2 = "/" + output.rss2;
  }

  if (output.atom.charAt(0) !== '/') {
    output.atom = "/" + output.atom;
  }

  if (output.json.charAt(0) !== '/') {
    output.json = "/" + output.json;
  }

  setHeadComponents([_react.default.createElement("link", {
    key: "@fec/gatsby-plugin-feed-rss2",
    rel: "alternate",
    type: "application/rss+xml",
    href: withPrefix(output.rss2),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  })]);
  setHeadComponents([_react.default.createElement("link", {
    key: "@fec/gatsby-plugin-feed-atom",
    rel: "alternate",
    type: "application/atom+xml",
    href: withPrefix(output.atom),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  })]);
  setHeadComponents([_react.default.createElement("link", {
    key: "@fec/gatsby-plugin-feed-json",
    rel: "alternate",
    type: "application/json",
    href: withPrefix(output.json),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  })]);
}

exports.onRenderBody = function (_ref2, pluginOptions) {
  var pathname = _ref2.pathname,
      setHeadComponents = _ref2.setHeadComponents;

  if (pluginOptions.feeds && !Array.isArray(pluginOptions.feeds)) {
    throw new Error('@fec/gatsby-plugin-feed `feeds` option must be an array.');
  } else if (!pluginOptions.feeds) {
    generateFeed({
      graphql: graphql
    }, {});
  }

  pluginOptions.feeds.forEach(function (feedOptions) {
    return renderLinksInHead({
      pathname: pathname,
      setHeadComponents: setHeadComponents
    }, feedOptions);
  });
};