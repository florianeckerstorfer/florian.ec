import React, { ReactElement } from 'react';

import H1 from '../components/H1/H1';
import IProjectEdge from '../types/IProjectEdge';
import ISiteMetadata from '../types/ISiteMetadata';
import Layout from '../layouts/Layout';
import ProjectList from '../components/ProjectList/ProjectList';
import SEO from '../components/SEO/SEO';
import { graphql } from 'gatsby';

export interface Props {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: IProjectEdge[];
    };
  };
}

const ProjectsPage: React.FC<Props> = ({
  data,
  location,
}: Props): ReactElement => {
  const siteTitle = data.site.siteMetadata.title;
  const projects = data.allMarkdownRemark.edges;
  console.log(projects);
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Projects"
        keywords={[
          'florian eckerstorfer',
          'web developer',
          'software developer',
          'projects',
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
      sort: { fields: [frontmatter___active, frontmatter___date], order: [DESC, DESC] }
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
            link
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
