const { Feed } = require('feed');

class FeedJson {
  data() {
    return {
      permalink: '/feed.json',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const feed = new Feed({
      title: 'Florian Eckerstorfer',
      description: 'Personal website and blog of Florian Eckerstorfer',
      id: 'https://florian.ec',
      link: 'https://florian.ec',
      language: 'en',
      image: 'https://florian.ec/image.png',
      favicon: 'https://florian.ec/favicon.ico',
      copyright: 'All rights reserved 2019, Florian Eckerstorfer',
      updated: new Date(2013, 6, 14),
      feedLinks: {
        json: 'https://florian.ec/feed.json',
        atom: 'https://florian.ec/atom.xml',
      },
      author: {
        name: 'Florian Eckerstorfer',
        email: 'florian@eckerstorfer.net',
        link: 'https://florian.ec',
      },
    });

    data.collections.blog.forEach(post => {
      console.log(post);
      feed.addItem({
        title: post.title,
        id: post.url,
        link: post.url,
        description: post.description,
        content: post.templateContent,
        author: [
          {
            name: 'Florian Eckerstorfer',
            email: 'florian@eckerstorfer.net',
            link: 'https://florian.ec',
          },
        ],
        date: post.date,
        image: post.image,
      });
    });

    feed.addCategory('Technologie');

    return feed.json1();
  }
}

module.exports = FeedJson;
