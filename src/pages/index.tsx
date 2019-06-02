import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import IBlogEdge from '../types/IBlogEdge';
import ISiteMetadata from '../types/ISiteMetadata';
import ArticleList from '../components/ArticleList/ArticleList';
import H1 from '../components/H1/H1';
import utilCss from '../components/util.module.css';

interface IProps {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: IBlogEdge[];
    };
  };
}

const IndexPage: React.FC<IProps> = ({ data, location }: IProps) => {
  const siteTitle = data.site.siteMetadata.title;
  const articles = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle}>
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
