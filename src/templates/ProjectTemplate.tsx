import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import ISiteMetadata from '../types/ISiteMetadata';
import IPageContext from '../types/IPageContext';
import Project from '../components/Project/Project';
import IProject from '../types/IProject';

interface Props {
  location: Location;
  pageContext: IPageContext;
  data: {
    site: { siteMetadata: ISiteMetadata };
    markdownRemark: IProject;
  };
}

const ProjectTemplate: React.FC<Props> = ({
  data,
  location,
}: Props): ReactElement => {
  const project = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
      />
      <Project project={project} />
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`;
