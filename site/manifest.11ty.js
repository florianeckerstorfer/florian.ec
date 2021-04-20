const sharp = require('sharp');
const promisify = require('util').promisify;
const fs = require('fs');

const readFile = promisify(fs.readFile);

class Manifest {
  data() {
    return {
      permalink: '/manifest.webmanifest',
      eleventyExcludeFromCollections: true,
    };
  }

  async readOriginalIcon() {
    return await readFile('./site/images/manifest-icon.png');
  }

  async resizeIcon(icon, size) {
    return await sharp(icon)
      .resize(size, size)
      .toFile(`./dist/images/manifest-icon-${size}x${size}.png`);
  }

  renderIconManifestCb(originalIcon) {
    return async (size) => {
      this.resizeIcon(originalIcon, size);
      return {
        src: `/images/manifest-icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
      };
    };
  }

  async render() {
    const iconSizes = [48, 72, 96, 144, 192, 256, 384, 512];
    const originalIcon = await this.readOriginalIcon();
    const icons = await Promise.all(
      iconSizes.map(this.renderIconManifestCb(originalIcon))
    );

    return JSON.stringify({
      name: 'Florian Eckerstorfer',
      short_name: 'florian.ec',
      start_url: '/',
      background_color: '#7b00fd',
      theme_color: '#7b00fd',
      display: 'minimal-ui',
      icons,
    });
  }
}

module.exports = Manifest;
