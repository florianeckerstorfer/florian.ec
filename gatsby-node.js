const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const sharp = require('sharp');

sharp.cache(false);
sharp.simd(false);

// See https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-469046186
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };
  }
};

function createBlogPages({ graphql, createPage }) {
  const blogPost = path.resolve(`./src/templates/BlogPostTemplate.tsx`);
  return graphql(
    `
      {
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
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      const slug = post.node.frontmatter.slug;
      const path = `/blog/${slug}`;

      createPage({
        path,
        component: blogPost,
        context: {
          slug,
          previous,
          next,
        },
      });
    });

    return null;
  });
}

function createProjectPages({ graphql, createPage }) {
  const blogPost = path.resolve(`./src/templates/ProjectTemplate.tsx`);
  return graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/project/" } }
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
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const slug = post.node.frontmatter.slug;
      const path = `/projects/${slug}`;

      createPage({
        path,
        component: blogPost,
        context: {
          slug,
        },
      });
    });

    return null;
  });
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return createBlogPages({ createPage, graphql }).then(() =>
    createProjectPages({ createPage, graphql })
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
