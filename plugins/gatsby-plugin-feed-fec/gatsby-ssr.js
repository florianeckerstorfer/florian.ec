'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _internals = require('./internals');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  var _defaultOptions$plugi = _extends({}, _internals.defaultOptions, pluginOptions),
      rss = _defaultOptions$plugi.rss,
      json = _defaultOptions$plugi.json;

  var output = [];
  if (rss) {
    output.push(_react2.default.createElement('link', {
      rel: 'alternate',
      key: 'gatsby-feed-rss',
      type: 'application/rss+xml',
      href: 'feed.xml'
    }));
  }

  if (json) {
    output.push(_react2.default.createElement('link', {
      rel: 'alternate',
      key: 'gatsby-feed-json',
      type: 'application/json',
      href: 'feed.json'
    }));
  }

  setHeadComponents(output);
};