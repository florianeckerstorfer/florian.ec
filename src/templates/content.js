/* global graphql */
/* eslint-disable react/no-danger */

import get from 'lodash/get';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import PageContent from '../components/PageContent/PageContent';
import PageTitle from '../components/PageTitle/PageTitle';

class ContentTemplate extends React.PureComponent {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <PageTitle title={post.frontmatter.title} />
        <PageContent>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </PageContent>
      </div>
    );
  }
}

ContentTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        layout: PropTypes.string,
      }),
    }),
  }),
};

ContentTemplate.defaultProps = {
  data: {
    markdownRemark: {
      id: null,
      html: null,
      frontmatter: {
        layout: null,
      },
    },
  },
};

export default ContentTemplate;

export const pageQuery = graphql`
  query ContentByPath($path: String!) {
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
        layout
        path
        title
      }
    }
  }
`;
