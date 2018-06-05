/* global graphql */

import get from 'lodash/get';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Post from '../components/Post/Post';
import Pagination from '../components/Pagination/Pagination';

const BlogIndex = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount } = pathContext;
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  const siteTitle = get(data, 'site.siteMetadata.title');

  return (
    <div>
      <Helmet title={siteTitle} />
      {group.map(post => {
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
      <Pagination
        first={first}
        index={index}
        last={last}
        nextUrl={nextUrl}
        pageCount={pageCount}
        previousUrl={previousUrl}
      />
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
  pathContext: PropTypes.shape({
    group: PropTypes.shape(),
    index: PropTypes.number,
    first: PropTypes.number,
    last: PropTypes.number,
    pageCount: PropTypes.number,
  }),
};

BlogIndex.defaultProps = {
  data: {
    site: { siteMetadata: { title: null } },
    allMarkdownRemark: { edges: [] },
  },
  pathContext: {
    group: {},
    index: 0,
    first: 0,
    last: 0,
    pageCount: 0,
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
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
