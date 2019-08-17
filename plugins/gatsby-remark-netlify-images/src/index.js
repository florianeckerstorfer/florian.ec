const {
  DEFAULT_OPTIONS,
  imageClass,
  imageBackgroundClass,
  imageWrapperClass,
} = require(`./constants`);
const visitWithParents = require(`unist-util-visit-parents`);
const getDefinitions = require(`mdast-util-definitions`);
const path = require(`path`);
const queryString = require(`query-string`);
const isRelativeUrl = require(`is-relative-url`);
const _ = require(`lodash`);
const Promise = require(`bluebird`);
const cheerio = require(`cheerio`);
const slash = require(`slash`);
const chalk = require(`chalk`);
const { fluid } = require('./fluid');

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
module.exports = (
  {
    files,
    markdownNode,
    markdownAST,
    pathPrefix,
    getNode,
    reporter,
    cache,
    compiler,
  },
  pluginOptions
) => {
  const options = _.defaults(pluginOptions, { pathPrefix }, DEFAULT_OPTIONS);

  const findParentLinks = ({ children }) =>
    children.some(
      node =>
        (node.type === `html` && !!node.value.match(/<a /)) ||
        node.type === `link`
    );

  // Get all the available definitions in the markdown tree
  const definitions = getDefinitions(markdownAST);

  // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)
  let rawHtmlNodes = [];
  visitWithParents(markdownAST, [`html`, `jsx`], (node, ancestors) => {
    const inLink = ancestors.some(findParentLinks);

    rawHtmlNodes.push({ node, inLink });
  });

  // This will only work for markdown syntax image tags
  let markdownImageNodes = [];

  visitWithParents(
    markdownAST,
    [`image`, `imageReference`],
    (node, ancestors) => {
      const inLink = ancestors.some(findParentLinks);

      markdownImageNodes.push({ node, inLink });
    }
  );

  const getImageInfo = uri => {
    const { url, query } = queryString.parseUrl(uri);
    return {
      ext: path
        .extname(url)
        .split(`.`)
        .pop(),
      url,
      query,
    };
  };

  const getImageCaption = (node, overWrites) => {
    const getCaptionString = () => {
      const captionOptions = Array.isArray(options.showCaptions)
        ? options.showCaptions
        : options.showCaptions === true
        ? [`title`, `alt`]
        : false;

      if (captionOptions) {
        for (const option of captionOptions) {
          switch (option) {
            case `title`:
              if (node.title) {
                return node.title;
              }
              break;
            case `alt`:
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

      return ``;
    };

    const captionString = getCaptionString();

    if (!options.markdownCaptions || !compiler) {
      return _.escape(captionString);
    }

    return compiler.generateHTML(compiler.parseString(captionString));
  };

  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  const generateImagesAndUpdateNode = async function(
    node,
    resolve,
    inLink,
    overWrites = {}
  ) {
    const imagePath = node.url;

    if (!imagePath) {
      return resolve();
    }

    const fluidSizes = [
      options.maxWidth, // ensure maxWidth (or maxHeight) is added
    ];
    fluidSizes.push(options.maxWidth / 4);
    fluidSizes.push(options.maxWidth / 2);
    fluidSizes.push(options.maxWidth * 1.5);
    fluidSizes.push(options.maxWidth * 2);

    const srcSet = fluidSizes
      .map(size => Math.round(size))
      .map(size => `${imagePath}?nf_resize=fit&w=${size} ${size}w`)
      .join(`,\n`);

    const originalImg = imagePath;
    const fallbackSrc = imagePath;
    const presentationWidth = options.maxWidth;

    // Generate default alt tag
    const srcSplit = getImageInfo(node.url).url.split(`/`);
    const fileName = srcSplit[srcSplit.length - 1];
    const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``);
    const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `);

    const sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`;

    const alt = _.escape(
      overWrites.alt ? overWrites.alt : node.alt ? node.alt : defaultAlt
    );

    const title = node.title ? _.escape(node.title) : alt;

    const loading = options.loading;

    if (![`lazy`, `eager`, `auto`].includes(loading)) {
      reporter.warn(
        reporter.stripIndent(`
          ${chalk.bold(loading)} is an invalid value for the ${chalk.bold(
          `loading`
        )} option. Please pass one of "lazy", "eager" or "auto".
        `)
      );
    }

    // Create our base image tag
    let imageTag = `
        <img
          class="${imageClass}"
          alt="${alt}"
          title="${title}"
          src="${fallbackSrc}"
          srcset="${srcSet}"
          sizes="${sizes}"
          loading="${loading}"
        />
      `.trim();

    // Construct new image node w/ aspect ratio placeholder
    const imageCaption =
      options.showCaptions && getImageCaption(node, overWrites);

    let rawHTML = `${imageTag}`.trim();

    // Make linking to original image optional.
    if (!inLink && options.linkImagesToOriginal) {
      rawHTML = `
    <a
      class="gatsby-resp-image-link"
      href="${originalImg}"
      style="display: block"
      target="_blank"
      rel="noopener"
    >
      ${rawHTML}
    </a>
      `.trim();
    }

    rawHTML = `
      <span
        class="${imageWrapperClass}"
        style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: ${presentationWidth}px;"
      >
        ${rawHTML}
      </span>
      `.trim();

    // Wrap in figure and use title as caption
    if (imageCaption) {
      rawHTML = `
    <figure class="gatsby-resp-image-figure">
      ${rawHTML}
      <figcaption class="gatsby-resp-image-figcaption">${imageCaption}</figcaption>
    </figure>
        `.trim();
    }

    return rawHTML;
  };

  return Promise.all(
    // Simple because there is no nesting in markdown
    markdownImageNodes.map(
      ({ node, inLink }) =>
        new Promise(async (resolve, reject) => {
          const overWrites = {};
          let refNode;
          if (
            !node.hasOwnProperty(`url`) &&
            node.hasOwnProperty(`identifier`)
          ) {
            //consider as imageReference node
            refNode = node;
            node = definitions(refNode.identifier);
            // pass original alt from referencing node
            overWrites.alt = refNode.alt;
            if (!node) {
              // no definition found for image reference,
              // so there's nothing for us to do.
              return resolve();
            }
          }
          const fileType = getImageInfo(node.url).ext;

          // Ignore gifs as we can't process them,
          // svgs as they are already responsive by definition
          if (
            isRelativeUrl(node.url) &&
            fileType !== `gif` &&
            fileType !== `svg`
          ) {
            const rawHTML = await generateImagesAndUpdateNode(
              node,
              resolve,
              inLink,
              overWrites
            );

            if (rawHTML) {
              // Replace the image or ref node with an inline HTML node.
              if (refNode) {
                node = refNode;
              }
              node.type = `html`;
              node.value = rawHTML;
            }
            return resolve(node);
          } else {
            // Image isn't relative so there's nothing for us to do.
            return resolve();
          }
        })
    )
  ).then(markdownImageNodes =>
    // HTML image node stuff
    Promise.all(
      // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(
        ({ node, inLink }) =>
          new Promise(async (resolve, reject) => {
            if (!node.value) {
              return resolve();
            }

            const $ = cheerio.load(node.value);
            if ($(`img`).length === 0) {
              // No img tags
              return resolve();
            }

            let imageRefs = [];
            $(`img`).each(function() {
              imageRefs.push($(this));
            });

            for (let thisImg of imageRefs) {
              // Get the details we need.
              let formattedImgTag = {};
              formattedImgTag.url = thisImg.attr(`src`);
              formattedImgTag.title = thisImg.attr(`title`);
              formattedImgTag.alt = thisImg.attr(`alt`);

              if (!formattedImgTag.url) {
                return resolve();
              }

              const fileType = getImageInfo(formattedImgTag.url).ext;

              // Ignore gifs as we can't process them,
              // svgs as they are already responsive by definition
              if (
                isRelativeUrl(formattedImgTag.url) &&
                fileType !== `gif` &&
                fileType !== `svg`
              ) {
                const rawHTML = await generateImagesAndUpdateNode(
                  formattedImgTag,
                  resolve,
                  inLink
                );

                if (rawHTML) {
                  // Replace the image string
                  thisImg.replaceWith(rawHTML);
                } else {
                  return resolve();
                }
              }
            }

            // Replace the image node with an inline HTML node.
            node.type = `html`;
            node.value = $(`body`).html(); // fix for cheerio v1

            return resolve(node);
          })
      )
    ).then(htmlImageNodes =>
      markdownImageNodes.concat(htmlImageNodes).filter(node => !!node)
    )
  );
};
