"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _lodash = _interopRequireDefault(require("lodash"));

var pluginOptions = (0, _extends2.default)({}, pluginOptions);

exports.setPluginOptions = function (opts) {
  pluginOptions = ((0, _readOnlyError2.default)("pluginOptions"), Object.assign({}, pluginOptions, opts));
  return pluginOptions;
};

exports.getPluginOptions = function () {
  return pluginOptions;
};

var healOptions = function healOptions(args, defaultArgs) {
  if (defaultArgs === void 0) {
    defaultArgs = {};
  }

  var options = _lodash.default.defaults({}, args, {
    quality: quality
  }, defaultArgs); // only set width to 400 if neither width nor height is passed


  if (options.width === undefined && options.height === undefined) {
    options.width = 400;
  } else if (options.width !== undefined) {
    options.width = parseInt(options.width, 10);
  } else if (options.height !== undefined) {
    options.height = parseInt(options.height, 10);
  } // only set maxWidth to 800 if neither maxWidth nor maxHeight is passed


  if (options.maxWidth === undefined && options.maxHeight === undefined) {
    options.maxWidth = 800;
  } else if (options.maxWidth !== undefined) {
    options.maxWidth = parseInt(options.maxWidth, 10);
  } else if (options.maxHeight !== undefined) {
    options.maxHeight = parseInt(options.maxHeight, 10);
  }

  return options;
};

exports.healOptions = healOptions;