const fs = require('fs');

function imgExists(img) {
  return fs.existsSync(`dist/${img}`);
}

function generateSrcSet(base, extension, width) {
  return [1, 2]
    .map(resolution => ({
      src: `${base}-${width * resolution}${extension}`,
      resolution,
    }))
    .filter(img => imgExists(img.src))
    .map(img => `${img.src} ${img.resolution}x`);
}

function generateSource(base, extension, width) {
  const srcSet = generateSrcSet(base, extension, width);
  return srcSet.length > 0
    ? `<source
      srcset="${srcSet.join(', ')}"
      media="(min-width: ${width}px)"
    >`
    : '';
}

function responsiveImg(img, alt, caption) {
  const extension = img.substring(img.lastIndexOf('.'));
  const base = img.substring(0, img.lastIndexOf('.'));

  const picture = `<picture>
    ${generateSource(base, extension, 960)}
    ${generateSource(base, extension, 640)}
    <img
      srcset="${generateSrcSet(base, extension, 320)}"
      alt="${alt}"
    >
  </picture>`;

  const figCaption = `<figcaption class="figure__caption">${caption || alt}</figcaption>`;

  return `<figure class="figure">
    ${picture}
    ${figCaption}
  </figure>`;
}

module.exports = responsiveImg;
