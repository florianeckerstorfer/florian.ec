const _ = require('lodash');
const path = require('path');

exports.default = (createPage, posts) => {
  const blogPost = path.resolve('./src/templates/content.js');

  _.each(posts, edge => {
    createPage({
      path: edge.node.frontmatter.path,
      component: blogPost,
      context: {
        // path: edge.node.frontmatter.path,
      },
    });
  });
};
