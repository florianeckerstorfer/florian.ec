const sharp = require('sharp');
const promisify = require('util').promisify;
const fs = require('fs');

const readFile = promisify(fs.readFile);

class AppleTouchIcon {
  async readOriginalIcon() {
    return await readFile('./src/images/apple-touch-icon.png');
  }

  async resizeIcon(icon, size) {
    return await sharp(icon)
      .resize(size, size)
      .toFile(`./dist/images/apple-touch-icon-${size}x${size}.png`);
  }

  async render() {
    // See https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/
    const iconSizes = [120, 152, 167, 180];
    const originalIcon = await this.readOriginalIcon();
    await Promise.all(
      iconSizes.map(async size => {
        this.resizeIcon(originalIcon, size);
      })
    );

    return false;
  }
}

module.exports = AppleTouchIcon;
