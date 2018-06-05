const Promise = require('bluebird');
const createPaginatedPages = require('gatsby-paginate');
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
        }

        const posts = result.data.allMarkdownRemark.edges;

        createPaginatedPages({
          edges: posts,
          createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 5,
        });

        createBlogPostPages(createPage, posts);
        createTagPages(createPage, posts);
        createCategoryPages(createPage, posts);
      })
    );
  });
