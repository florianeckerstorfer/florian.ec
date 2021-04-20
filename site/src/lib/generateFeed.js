const { Feed } = require('feed');

const author = {
  name: 'Florian Eckerstorfer',
  email: 'florian@eckerstorfer.net',
  link: 'https://florian.ec',
};

function generateFeed(posts) {
  const feed = new Feed({
    title: 'Florian Eckerstorfer',
    description: 'Personal website and blog of Florian Eckerstorfer',
    id: 'https://florian.ec',
    link: 'https://florian.ec',
    language: 'en',
    image: 'https://florian.ec/image.png',
    favicon: 'https://florian.ec/favicon.ico',
    copyright: `All rights reserved 2013-2020, Florian Eckerstorfer`,
    updated: new Date(),
    feedLinks: {
      json: 'https://florian.ec/feed.json',
      atom: 'https://florian.ec/atom.xml',
    },
    author,
  });

  posts.forEach(post => {
    feed.addItem({
      content: post.templateContent,
      description: post.data.description,
      id: post.url,
      link: post.url,
      title: post.data.title,
      author: [author],
      date: post.date,
    });
  });

  feed.addCategory('Personal');

  return feed;
}

module.exports = generateFeed;
