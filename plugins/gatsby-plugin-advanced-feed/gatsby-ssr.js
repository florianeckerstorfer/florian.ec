"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _internals = require("./internals");

var _jsxFileName = "/Users/florian/Projects/florian/next.florian.ec/plugins/gatsby-plugin-advanced-feed/src/gatsby-ssr.js";
// TODO: remove for v3
var withPrefix = _gatsby.withAssetPrefix || _gatsby.withPrefix;

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$plugi = (0, _extends2.default)({}, _internals.defaultOptions, pluginOptions),
      createLinkInHead = _defaultOptions$plugi.createLinkInHead;

  var output = (0, _extends2.default)({}, _internals.defaultOptions.output, pluginOptions.output);

  if (!createLinkInHead) {
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
    key: "gatsby-plugin-advanced-feed-rss2",
    rel: "alternate",
    type: "application/rss+xml",
    href: withPrefix(output.rss2),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  })]);
  setHeadComponents([_react.default.createElement("link", {
    key: "gatsby-plugin-advanced-feed-atom",
    rel: "alternate",
    type: "application/atom+xml",
    href: withPrefix(output.atom),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  })]);
  setHeadComponents([_react.default.createElement("link", {
    key: "gatsby-plugin-advanced-feed-json",
    rel: "alternate",
    type: "application/json",
    href: withPrefix(output.json),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  })]);
};