const generateFeed = require('./lib/generateFeed');

class FeedAtom {
  data() {
    return {
      permalink: '/atom.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    return generateFeed(data.collections.blog).atom1();
  }
}

module.exports = FeedAtom;
