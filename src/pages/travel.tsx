import React, { ReactElement } from 'react';

import H1 from '../components/H1/H1';
import ISiteMetadata from '../types/ISiteMetadata';
import TravelEdge from '../types/ITravelEdge';
import Layout from '../includes/layouts/Layout';
import Loadable from '@loadable/component';
import SEO from '../components/SEO/SEO';
import { graphql } from 'gatsby';

const TravelMap = Loadable(() => import('../components/TravelMap/TravelMap'));

export interface Props {
  location: Location;
  data: {
    site: { siteMetadata: ISiteMetadata };
    allMarkdownRemark: {
      edges: TravelEdge[];
    };
  };
}

const renderPageTitle = (props: { className?: string }) => (
  <H1 className={props.className} inHeader={true}>
    Travel Map
  </H1>
);

const TravelPage: React.FC<Props> = ({
  data,
  location,
}: Props): ReactElement => {
  const siteTitle = data.site.siteMetadata.title;
  const trips = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle} pageTitle={renderPageTitle}>
      <SEO
        title="Travel"
        keywords={['florian eckerstorfer', 'travel', 'vacations', 'road trips']}
      />
      <TravelMap trips={trips.map(trip => trip.node.frontmatter)} />
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
            locations {
              lat
              lng
              name
              icon
            }
          }
        }
      }
    }
  }
`;
