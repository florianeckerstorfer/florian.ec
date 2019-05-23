import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import IBlogEdge from '../types/IBlogEdge';
import ISiteMetadata from '../types/ISiteMetadata';
import H1 from '../components/H1/H1';
import styles from './projects.module.css';
import Label from '../components/Label/Label';

interface IProps {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: IBlogEdge[];
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
      <ul className={styles.list}>
        {projects.map(project => (
          <li className={styles.project}>
            <Link
              to={`/projects/${project.node.frontmatter.slug}`}
              className={styles.projectLink}
            >
              {project.node.frontmatter.title}
            </Link>
            {project.node.frontmatter.description && (
              <div className={styles.projectDescription}>
                {project.node.frontmatter.description}
              </div>
            )}
            {project.node.frontmatter.tags &&
              project.node.frontmatter.tags.map(tag => <Label>{tag}</Label>)}
          </li>
        ))}
      </ul>
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
            tags
          }
        }
      }
    }
  }
`;
