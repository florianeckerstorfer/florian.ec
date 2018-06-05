const Promise = require('bluebird');
const generateBlogPages = require('./src/node/generateBlogPages').default;
const generateContentPages = require('./src/node/generateContentPages').default;

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return Promise.all([
    generateBlogPages(graphql, createPage),
    generateContentPages(graphql, createPage),
  ]);
};
