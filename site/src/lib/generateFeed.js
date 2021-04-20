const { Feed } = require('feed');
const promisify = require('util').promisify;
const fs = require('fs');

const readFile = promisify(fs.readFile);

async function generateFeed(posts) {
  const metadata = JSON.parse(
    await readFile(`${__dirname}/../../data/metadata.json`)
  );

  const author = {
    name: metadata.title,
    email: metadata.author.email,
    link: metadata.url,
  };

  const feed = new Feed({
    title: metadata.title,
    description: metadata.description,
    id: metadata.url,
    link: metadata.url,
    language: 'en',
    image: `${metadata.url}/image.png`,
    favicon: `${metadata.url}/images/favicon.png`,
    copyright: `All rights reserved 2013-${new Date().getYear()}, Florian Eckerstorfer`,
    updated: new Date(),
    feedLinks: {
      json: `${metadata.url}/feed.json`,
      atom: `${metadata.url}/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
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

  feed.addCategory(metadata.category);

  return feed;
}

module.exports = generateFeed;
