/* eslint-disable react/no-danger */

import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout/Layout';
import PageContent from '../components/PageContent/PageContent';
import PageTitle from '../components/PageTitle/PageTitle';
import LocationPropType from '../propTypes/LocationPropType';
import SitePropType from '../propTypes/SitePropType';

const ContentTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

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
};

ContentTemplate.propTypes = {
  location: LocationPropType.isRequired,
  data: PropTypes.shape({
    site: SitePropType.isRequired,
    markdownRemark: PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        layout: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

ContentTemplate.defaultProps = {};

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
