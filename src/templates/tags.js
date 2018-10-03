import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import '../components/PageBar/pageBar.scss';
import PostHeaderList from '../components/PostHeaderList/PostHeaderList';
import Layout from '../components/Layout/Layout';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const postsString = `post${totalCount === 1 ? '' : 's'}`;

  return (
    <Layout>
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
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
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

Tags.defaultProps = {
  pageContext: { tag: null },
  data: {
    allMarkdownRemark: {
      totalCount: null,
      edges: [],
    },
  },
};

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
