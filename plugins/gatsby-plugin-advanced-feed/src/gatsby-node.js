import fs from 'fs';
import { Feed } from 'feed';
import dayjs from 'dayjs';
import { defaultOptions } from './internals';

const buildFeed = (pages, siteMetadata, output) => {
  const feed = new Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    link: siteMetadata.siteUrl,
    id: siteMetadata.siteUrl,
    copyright: `All rights reserved ${new Date().getUTCFullYear()}, ${
      siteMetadata.author
    }`,
    feedLinks: {
      atom: `${siteMetadata.siteUrl}/${output.atom}`,
      json: `${siteMetadata.siteUrl}/${output.json}`,
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
        id: `${siteMetadata.siteUrl}${page.fields.slug}`,
        link: `${siteMetadata.siteUrl}${page.fields.slug}`,
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

const generateAtomFeed = (feed, name) =>
  fs.writeFileSync(`./public/${name}`, feed.atom1());
const generateRSS = (feed, name) =>
  fs.writeFileSync(`./public/${name}`, feed.rss2());
const generateJSONFeed = (feed, name) =>
  fs.writeFileSync(`./public/${name}`, feed.json1());

exports.onPostBuild = ({ graphql }, pluginOptions) => {
  const output = { ...defaultOptions.output, ...pluginOptions.output };

  graphql(`
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
    const feed = buildFeed(posts, siteMetadata, output);
    generateAtomFeed(feed, output.atom);
    generateRSS(feed, output.rss2);
    generateJSONFeed(feed, output.json);
  });
};
