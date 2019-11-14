const generateFeed = require('./lib/generateFeed');

class RssFeed {
  data() {
    return {
      permalink: '/rss.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    return generateFeed(data.collections.blog).rss2();
  }
}

module.exports = RssFeed;
