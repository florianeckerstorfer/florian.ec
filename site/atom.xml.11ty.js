const generateFeed = require('./src/lib/generateFeed');

class FeedAtom {
  data() {
    return {
      permalink: '/atom.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  async render(data) {
    return (await generateFeed(data.collections.blog)).atom1();
  }
}

module.exports = FeedAtom;
