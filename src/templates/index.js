import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Pagination from '../components/Pagination/Pagination';
import Post from '../components/Post/Post';
import Layout from '../components/Layout/Layout';
import SitePropType from '../propTypes/SitePropType';
import BlogPostListPropType from '../propTypes/BlogPostListPropType';
import LocationPropType from '../propTypes/LocationPropType';

const BlogIndex = ({ data, pageContext, location }) => {
  const { group, index, first, last, pageCount } = pageContext;
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  const siteTitle = get(data, 'site.siteMetadata.title');

  return (
    <Layout location={location}>
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
    </Layout>
  );
};

BlogIndex.propTypes = {
  location: LocationPropType.isRequired,
  data: PropTypes.shape({
    site: SitePropType.isRequired,
    allMarkdownRemark: BlogPostListPropType.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    group: PropTypes.array,
    index: PropTypes.number,
    first: PropTypes.bool,
    last: PropTypes.bool,
    pageCount: PropTypes.number,
  }),
};

BlogIndex.defaultProps = {
  pageContext: {
    group: {},
    index: 0,
    first: false,
    last: false,
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
          id
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
