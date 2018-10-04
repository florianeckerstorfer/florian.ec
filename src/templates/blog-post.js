import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post/Post';
import Layout from '../components/Layout/Layout';

class BlogPostTemplate extends React.PureComponent {
  render() {
    const { data, location } = this.props;
    const post = data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <Layout location={location}>
        <div>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <Post frontmatter={post.frontmatter} html={post.html} detail />
        </div>
      </Layout>
    );
  }
}

BlogPostTemplate.propTypes = {
  location: PropTypes.shape().isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }),
};

BlogPostTemplate.defaultProps = {
  data: {
    markdownRemark: {
      id: null,
      html: null,
      frontmatter: {
        category: null,
        date: null,
        tags: [],
      },
    },
  },
};

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
