import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout/Layout';
import '../components/PageBar/pageBar.scss';
import PostHeaderList from '../components/PostHeaderList/PostHeaderList';
import LocationPropType from '../propTypes/LocationPropType';
import BlogPostNodeType from '../propTypes/BlogPostNodePropType';

const Categories = ({ pageContext, data, location }) => {
  const { category } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const postString = `post${totalCount === 1 ? '' : 's'}`;

  return (
    <Layout location={location}>
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
    </Layout>
  );
};

Categories.propTypes = {
  location: LocationPropType.isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: BlogPostNodeType({ detail: false }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

Categories.defaultProps = {};

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
          id
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
