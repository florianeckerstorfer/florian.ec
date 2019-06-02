const fs = require('fs');
const { Feed } = require('feed');
const dayjs = require('dayjs');

const buildFeed = (pages, siteMetadata) => {
  const feed = new Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    link: siteMetadata.siteUrl,
    id: siteMetadata.siteUrl,
    copyright: `All rights reserved ${new Date().getUTCFullYear()}, ${
      siteMetadata.author
    }`,
    feedLinks: {
      atom: `${siteMetadata.siteUrl}/atom.xml`,
      json: `${siteMetadata.siteUrl}/feed.json`,
    },
    author: {
      name: siteMetadata.author,
      email: siteMetadata.email,
    },
  });

  pages
    .map(page => page.node)
    .sort((a, b) =>
      dayjs(a.frontmatter.date).isBefore(dayjs(b.frontmatter.date)) ? -1 : 1
    )
    .reverse()
    .slice(0, 10)
    .forEach(page => {
      feed.addItem({
        title: page.frontmatter.title,
        id: siteMetadata.siteUrl + page.fields.slug,
        link: siteMetadata.siteUrl + page.fields.slug,
        date: dayjs(page.frontmatter.date).toDate(),
        content: page.html,
        author: [
          {
            name: siteMetadata.author,
            email: siteMetadata.email,
            link: siteMetadata.siteUrl,
          },
        ],
      });
    });

  feed.addContributor({
    name: siteMetadata.author,
    email: siteMetadata.email,
    link: siteMetadata.siteUrl,
  });

  return feed;
};

const generateAtomFeed = feed =>
  fs.writeFileSync('./public/atom.xml', feed.atom1());
const generateRSS = feed => fs.writeFileSync('./public/rss2.xml', feed.rss2());
const generateJSONFeed = feed =>
  fs.writeFileSync('./public/feed.json', feed.json1());

exports.onPostBuild = ({ graphql }) => {
  return graphql(`
    {
      site {
        siteMetadata {
          title
          description
          author
          email
          siteUrl
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              slug
              title
              date
            }
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;
    const siteMetadata = result.data.site.siteMetadata;
    const feed = buildFeed(posts, siteMetadata);
    generateAtomFeed(feed);
    generateRSS(feed);
    generateJSONFeed(feed);
  });
};
