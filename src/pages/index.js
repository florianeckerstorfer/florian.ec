/* global graphql */

import get from 'lodash/get';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Post from '../components/Post/Post';

const BlogIndex = ({ data }) => {
  const siteTitle = get(data, 'site.siteMetadata.title');
  const posts = get(data, 'allMarkdownRemark.edges');

  return (
    <div>
      <Helmet title={siteTitle} />
      {posts.map(post => {
        if (post.node.path !== '/404/') {
          return (
            <Post
              key={post.node.frontmatter.path}
              frontmatter={post.node.frontmatter}
              html={post.node.html}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              category: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string),
              title: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
  }),
};

BlogIndex.defaultProps = {
  data: {
    site: { siteMetadata: { title: null } },
    allMarkdownRemark: { edges: [] },
  },
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
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
`;
