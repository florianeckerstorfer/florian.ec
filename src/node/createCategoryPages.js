const _ = require('lodash');
const path = require('path');

exports.default = (createPage, posts) => {
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
