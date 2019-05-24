import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import ISiteMetadata from '../types/ISiteMetadata';
import H1 from '../components/H1/H1';
import IProjectEdge from '../types/IProjectEdge';
import ProjectList from '../components/ProjectList/ProjectList';

export interface IProps {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: IProjectEdge[];
    };
  };
}

const ProjectsPage: React.FC<IProps> = ({ data, location }: IProps) => {
  const siteTitle = data.site.siteMetadata.title;
  const projects = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Projects"
        keywords={[
          'florian eckerstorfer',
          'web developer',
          'software developer',
        ]}
      />
      <H1>Projects</H1>
      <ProjectList projects={projects} />
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___active, frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            active
            category
            date(formatString: "YYYY-MM-DD")
            description
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
