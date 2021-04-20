const generateFeed = require('./src/lib/generateFeed');

class FeedJson {
  data() {
    return {
      permalink: '/feed.json',
      eleventyExcludeFromCollections: true,
    };
  }

  async render(data) {
    return (await generateFeed(data.collections.blog)).json1();
  }
}

module.exports = FeedJson;
