const Promise = require('bluebird');
const createContentPages = require('./createContentPages').default;

exports.default = (graphql, createPage) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            limit: 1000
            filter: { fileAbsolutePath: { regex: "/pages/" } }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  tags
                  category
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
          return;
        }

        const posts = result.data.allMarkdownRemark.edges;

        createContentPages(createPage, posts);
      })
    );
  });
