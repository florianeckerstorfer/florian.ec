const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');

const createBlogPostPages = (createPage, posts) => {
  const blogPost = path.resolve('./src/templates/blog-post.js');

  _.each(posts, edge => {
    createPage({
      path: edge.node.frontmatter.path,
      component: blogPost,
      context: {
        path: edge.node.frontmatter.path,
      },
    });
  });
};

const createTagPages = (createPage, posts) => {
  const tagTemplate = path.resolve('./src/templates/tags.js');

  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.tags')) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};

const createCategoryPages = (createPage, posts) => {
  const categoryTemplate = path.resolve('./src/templates/categories.js');

  let categories = [];
  // Iterate through each post, putting all found tags into `tags`
  _.each(posts, edge => {
    if (_.get(edge, 'node.frontmatter.category')) {
      categories.push(edge.node.frontmatter.category);
    }
  });
  // Eliminate duplicate tags
  categories = _.uniq(categories);

  // Make tag pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(limit: 1000) {
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
};
