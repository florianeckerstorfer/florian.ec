const generateFeed = require('./src/lib/generateFeed');

class RssFeed {
  data() {
    return {
      permalink: '/rss.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  async render(data) {
    return (await generateFeed(data.collections.blog)).rss2();
  }
}

module.exports = RssFeed;
