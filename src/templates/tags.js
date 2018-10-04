import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import '../components/PageBar/pageBar.scss';
import PostHeaderList from '../components/PostHeaderList/PostHeaderList';
import Layout from '../components/Layout/Layout';
import LocationPropType from '../propTypes/LocationPropType';
import BlogPostNodeType from '../propTypes/BlogPostNodePropType';

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const postsString = `post${totalCount === 1 ? '' : 's'}`;

  return (
    <Layout location={location}>
      <div className="tag-page">
        <header className="page-bar">
          <h1>
            {`${tag} `}
            <em>
              ({totalCount} {postsString})
            </em>
          </h1>
          <Link to="/tags">All tags</Link>
        </header>
        <PostHeaderList posts={edges} />
      </div>
    </Layout>
  );
};

Tags.propTypes = {
  location: LocationPropType.isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
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

Tags.defaultProps = {};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
