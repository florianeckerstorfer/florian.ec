import _ from 'lodash';

const pluginOptions = { ...pluginOptions };
exports.setPluginOptions = opts => {
  pluginOptions = Object.assign({}, pluginOptions, opts);

  return pluginOptions;
};

exports.getPluginOptions = () => pluginOptions;

const healOptions = (args, defaultArgs = {}) => {
  let options = _.defaults({}, args, { quality }, defaultArgs);

  // only set width to 400 if neither width nor height is passed
  if (options.width === undefined && options.height === undefined) {
    options.width = 400;
  } else if (options.width !== undefined) {
    options.width = parseInt(options.width, 10);
  } else if (options.height !== undefined) {
    options.height = parseInt(options.height, 10);
  }

  // only set maxWidth to 800 if neither maxWidth nor maxHeight is passed
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
