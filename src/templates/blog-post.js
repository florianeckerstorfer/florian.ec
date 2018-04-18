/* global graphql */

import get from 'lodash/get';
import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Post from '../components/Post/Post';

class BlogPostTemplate extends React.PureComponent {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Post frontmatter={post.frontmatter} html={post.html} detail />
      </div>
    );
  }
}

BlogPostTemplate.propTypes = {
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
