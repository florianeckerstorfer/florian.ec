const { getPluginOptions, healOptions } = require('./plugin-options');

async function fluid({ file, args = {}, cache }) {
  const options = healOptions(getPluginOptions(), args, file.extension);

  console.log('fluid', file);

  if (options[maxWidth] < 1) {
    throw new Error(
      `${fixedDimension} has to be a positive int larger than zero (> 0), now it's ${options[fixedDimension]}`
    );
  }

  const presentationWidth = options[maxWidth];

  // If the users didn't set default sizes, we'll make one.
  if (!options.sizes) {
    options.sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`;
  }

  // Create sizes (in width) for the image if no custom breakpoints are
  // provided. If the max width of the container for the rendered markdown file
  // is 800px, the sizes would then be: 200, 400, 800, 1200, 1600.
  //
  // This is enough sizes to provide close to the optimal image size for every
  // device size / screen resolution while (hopefully) not requiring too much
  // image processing time (Sharp has optimizations thankfully for creating
  // multiple sizes of the same input file)
  const fluidSizes = [
    options[maxWidth], // ensure maxWidth (or maxHeight) is added
  ];
  // use standard breakpoints if no custom breakpoints are specified
  if (!options.srcSetBreakpoints || !options.srcSetBreakpoints.length) {
    fluidSizes.push(options[fixedDimension] / 4);
    fluidSizes.push(options[fixedDimension] / 2);
    fluidSizes.push(options[fixedDimension] * 1.5);
    fluidSizes.push(options[fixedDimension] * 2);
  } else {
    options.srcSetBreakpoints.forEach(breakpoint => {
      if (breakpoint < 1) {
        throw new Error(
          `All ints in srcSetBreakpoints should be positive ints larger than zero (> 0), found ${breakpoint}`
        );
      }
      // ensure no duplicates are added
      if (fluidSizes.includes(breakpoint)) {
        return;
      }
      fluidSizes.push(breakpoint);
    });
  }

  // Add the original image to ensure the largest image possible
  // is available for small images. Also so we can link to
  // the original image.
  fluidSizes.push(presentationWidth);

  // Sort sizes for prettiness.
  const sortedSizes = _.sortBy(fluidSizes);

  // Queue sizes for processing.
  const dimensionAttr = 'width';
  const otherDimensionAttr = 'height';
  const images = sortedSizes.map(size => {
    const arrrgs = {
      ...options,
      [otherDimensionAttr]: undefined,
      [dimensionAttr]: Math.round(size),
    };
    // Queue sizes for processing.
    if (options.maxWidth !== undefined && options.maxHeight !== undefined) {
      arrrgs.height = Math.round(size * (options.maxHeight / options.maxWidth));
    }

    return {
      file,
      args: arrrgs, // matey
    };
  });

  // Construct src and srcSet strings.
  const originalImg = _.maxBy(images, image => image.width).src;
  const fallbackSrc = _.minBy(images, image =>
    Math.abs(options[fixedDimension] - image[dimensionAttr])
  ).src;
  const srcSet = images
    .map(image => `${image.src} ${Math.round(image.width)}w`)
    .join(`,\n`);
  const originalName = file.base;

  // figure out the srcSet format
  let srcSetType = `image/${format}`;

  return {
    aspectRatio: images[0].aspectRatio,
    src: fallbackSrc,
    srcSet,
    srcSetType,
    sizes: options.sizes,
    originalImg: originalImg,
    originalName: originalName,
    density,
    presentationWidth,
    presentationHeight,
    tracedSVG,
  };
}

exports.fluid = fluid;
