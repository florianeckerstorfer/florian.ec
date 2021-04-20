const generateFeed = require('./src/lib/generateFeed');

class FeedJson {
  data() {
    return {
      permalink: '/feed.json',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    return generateFeed(data.collections.blog).json1();
  }
}

module.exports = FeedJson;
