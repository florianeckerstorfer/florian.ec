import React, { ReactElement } from 'react';

import ArticleList from '../components/ArticleList/ArticleList';
import FeedLinks from '../components/FeedLinks/FeedLinks';
import H1 from '../components/H1/H1';
import IBlogEdge from '../types/IBlogEdge';
import ISiteMetadata from '../types/ISiteMetadata';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import { graphql } from 'gatsby';
import utilCss from '../components/util.module.css';

interface Props {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: IBlogEdge[];
    };
  };
}

const renderAsides = () => <FeedLinks />;

const IndexPage: React.FC<Props> = ({
  data,
  location,
}: Props): ReactElement => {
  const siteTitle = data.site.siteMetadata.title;
  const articles = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle} asides={[renderAsides]}>
      <SEO
        title="Home"
        keywords={[
          'florian eckerstorfer',
          'web developer',
          'software developer',
        ]}
      />
      <H1 className={utilCss.visuallyHidden}>Blog Posts</H1>
      <ArticleList articles={articles} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            slug
            date(formatString: "YYYY-MM-DD")
            title
            description
            category
          }
        }
      }
    }
  }
`;
