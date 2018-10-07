const Promise = require('bluebird');
const createPaginatedPages = require('gatsby-paginate');
const createBlogPostPages = require('./createBlogPostPages').default;
const createCategoryPages = require('./createCategoryPages').default;
const createTagPages = require('./createTagPages').default;

exports.default = (graphql, createPage) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(
            limit: 1000
            filter: { fileAbsolutePath: { regex: "/blog/" } }
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                id
                html
                frontmatter {
                  category
                  date(formatString: "MMMM DD, YYYY")
                  layout
                  path
                  tags
                  title
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

        createPaginatedPages({
          edges: posts,
          createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 30,
        });

        createBlogPostPages(createPage, posts);
        createTagPages(createPage, posts);
        createCategoryPages(createPage, posts);
      })
    );
  });
