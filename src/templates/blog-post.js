import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post/Post';
import Layout from '../components/Layout/Layout';
import BlogPostPropNodeType from '../propTypes/BlogPostNodePropType';
import SitePropType from '../propTypes/SitePropType';
import LocationPropType from '../propTypes/LocationPropType';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location}>
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Post frontmatter={post.frontmatter} html={post.html} detail />
      </div>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  location: LocationPropType.isRequired,
  data: PropTypes.shape({
    markdownRemark: BlogPostPropNodeType.isRequired,
    site: SitePropType.isRequired,
  }).isRequired,
};

BlogPostTemplate.defaultProps = {};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
`;
