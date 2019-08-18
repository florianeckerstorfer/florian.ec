"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('./plugin-options'),
    getPluginOptions = _require.getPluginOptions,
    healOptions = _require.healOptions;

function fluid(_x) {
  return _fluid.apply(this, arguments);
}

function _fluid() {
  _fluid = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var file, _ref$args, args, cache, options, presentationWidth, fluidSizes, sortedSizes, dimensionAttr, otherDimensionAttr, images, originalImg, fallbackSrc, srcSet, originalName, srcSetType;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = _ref.file, _ref$args = _ref.args, args = _ref$args === void 0 ? {} : _ref$args, cache = _ref.cache;
            options = healOptions(getPluginOptions(), args, file.extension);
            console.log('fluid', file);

            if (!(options[maxWidth] < 1)) {
              _context.next = 5;
              break;
            }

            throw new Error(fixedDimension + " has to be a positive int larger than zero (> 0), now it's " + options[fixedDimension]);

          case 5:
            presentationWidth = options[maxWidth]; // If the users didn't set default sizes, we'll make one.

            if (!options.sizes) {
              options.sizes = "(max-width: " + presentationWidth + "px) 100vw, " + presentationWidth + "px";
            } // Create sizes (in width) for the image if no custom breakpoints are
            // provided. If the max width of the container for the rendered markdown file
            // is 800px, the sizes would then be: 200, 400, 800, 1200, 1600.
            //
            // This is enough sizes to provide close to the optimal image size for every
            // device size / screen resolution while (hopefully) not requiring too much
            // image processing time (Sharp has optimizations thankfully for creating
            // multiple sizes of the same input file)


            fluidSizes = [options[maxWidth]]; // use standard breakpoints if no custom breakpoints are specified

            if (!options.srcSetBreakpoints || !options.srcSetBreakpoints.length) {
              fluidSizes.push(options[fixedDimension] / 4);
              fluidSizes.push(options[fixedDimension] / 2);
              fluidSizes.push(options[fixedDimension] * 1.5);
              fluidSizes.push(options[fixedDimension] * 2);
            } else {
              options.srcSetBreakpoints.forEach(function (breakpoint) {
                if (breakpoint < 1) {
                  throw new Error("All ints in srcSetBreakpoints should be positive ints larger than zero (> 0), found " + breakpoint);
                } // ensure no duplicates are added


                if (fluidSizes.includes(breakpoint)) {
                  return;
                }

                fluidSizes.push(breakpoint);
              });
            } // Add the original image to ensure the largest image possible
            // is available for small images. Also so we can link to
            // the original image.


            fluidSizes.push(presentationWidth); // Sort sizes for prettiness.

            sortedSizes = _.sortBy(fluidSizes); // Queue sizes for processing.

            dimensionAttr = 'width';
            otherDimensionAttr = 'height';
            images = sortedSizes.map(function (size) {
              var _extends2;

              var arrrgs = (0, _extends3.default)({}, options, (_extends2 = {}, _extends2[otherDimensionAttr] = undefined, _extends2[dimensionAttr] = Math.round(size), _extends2)); // Queue sizes for processing.

              if (options.maxWidth !== undefined && options.maxHeight !== undefined) {
                arrrgs.height = Math.round(size * (options.maxHeight / options.maxWidth));
              }

              return {
                file: file,
                args: arrrgs // matey

              };
            }); // Construct src and srcSet strings.

            originalImg = _.maxBy(images, function (image) {
              return image.width;
            }).src;
            fallbackSrc = _.minBy(images, function (image) {
              return Math.abs(options[fixedDimension] - image[dimensionAttr]);
            }).src;
            srcSet = images.map(function (image) {
              return image.src + " " + Math.round(image.width) + "w";
            }).join(",\n");
            originalName = file.base; // figure out the srcSet format

            srcSetType = "image/" + format;
            return _context.abrupt("return", {
              aspectRatio: images[0].aspectRatio,
              src: fallbackSrc,
              srcSet: srcSet,
              srcSetType: srcSetType,
              sizes: options.sizes,
              originalImg: originalImg,
              originalName: originalName,
              density: density,
              presentationWidth: presentationWidth,
              presentationHeight: presentationHeight,
              tracedSVG: tracedSVG
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fluid.apply(this, arguments);
}

exports.fluid = fluid;