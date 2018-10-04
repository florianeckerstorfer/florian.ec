/* eslint-disable react/no-danger */

import { graphql } from 'gatsby';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout/Layout';
import PageContent from '../components/PageContent/PageContent';
import PageTitle from '../components/PageTitle/PageTitle';

class ContentTemplate extends React.PureComponent {
  render() {
    const { data, location } = this.props;
    const post = data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <Layout location={location}>
        <div>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <PageTitle title={post.frontmatter.title} />
          <PageContent>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </PageContent>
        </div>
      </Layout>
    );
  }
}

ContentTemplate.propTypes = {
  location: PropTypes.shape().isRequired,
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
