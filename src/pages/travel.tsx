import React, { ReactElement, Suspense } from 'react';

import H1 from '../components/H1/H1';
import ISiteMetadata from '../types/ISiteMetadata';
import ITravelEdge from '../types/ITravelEdge';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import { graphql } from 'gatsby';

const TravelMap = React.lazy(() => import('../components/TravelMap/TravelMap'));

export interface Props {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: ITravelEdge[];
    };
  };
}

const TravelPage: React.FC<Props> = ({
  data,
  location,
}: Props): ReactElement => {
  const siteTitle = data.site.siteMetadata.title;
  const travels = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Travel"
        keywords={['florian eckerstorfer', 'travel', 'vacations', 'road trips']}
      />
      <H1>Travel</H1>
      <Suspense fallback={<div>Error loading</div>}>
        <TravelMap travels={travels} />
      </Suspense>
    </Layout>
  );
};

export default TravelPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/travel/" } }
      sort: {
        fields: [frontmatter___active, frontmatter___date_start]
        order: DESC
      }
    ) {
      edges {
        node {
          frontmatter {
            date_end(formatString: "YYYY-MM-DD")
            date_start(formatString: "YYYY-MM-DD")
            link
            title
            stops {
              lat
              lng
              name
            }
          }
        }
      }
    }
  }
`;
