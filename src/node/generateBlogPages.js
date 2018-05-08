const Promise = require('bluebird');
const createTagPages = require('./createTagPages').default;
const createCategoryPages = require('./createCategoryPages').default;
const createBlogPostPages = require('./createBlogPostPages').default;

exports.default = (graphql, createPage) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            limit: 1000
            filter: { fileAbsolutePath: { regex: "/blog/" } }
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
        }

        const posts = result.data.allMarkdownRemark.edges;

        createBlogPostPages(createPage, posts);
        createTagPages(createPage, posts);
        createCategoryPages(createPage, posts);
      })
    );
  });
