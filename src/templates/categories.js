/* global graphql */

import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import PostHeaderList from '../components/PostHeaderList/PostHeaderList';

import '../components/PageBar/pageBar.scss';

const Categories = ({ pathContext, data }) => {
  const { category } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const postString = `post${totalCount === 1 ? '' : 's'}`;

  return (
    <div className="tag-page">
      <header className="page-bar">
        <h1>
          {`${category} `}
          <em>
            ({totalCount} {postString})
          </em>
        </h1>
        <Link to="/categories">All categories</Link>
      </header>
      <PostHeaderList posts={edges} />
    </div>
  );
};

Categories.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

Categories.defaultProps = {
  pathContext: { categories: null },
  data: {
    allMarkdownRemark: {
      totalCount: null,
      edges: [],
    },
  },
};

export default Categories;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            category
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
