/* global graphql */

import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader/PageHeader';
import PageContent from '../components/PageContent/PageContent';

const AboutPage = ({ data }) => {
  const florianSizes = data.file.childImageSharp.sizes;

  return (
    <div>
      <Helmet title="About Florian Eckerstorfer" />
      <div>
        <PageHeader title="About" />
        <Img sizes={florianSizes} alt="Florian Eckerstorfer" />
        <PageContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            asperiores consectetur corporis dolorem doloremque ea hic ipsum
            magnam molestias nesciunt omnis, placeat quam quia repudiandae rerum
            sapiente tempore, vel voluptate.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            asperiores consectetur corporis dolorem doloremque ea hic ipsum
            magnam molestias nesciunt omnis, placeat quam quia repudiandae rerum
            sapiente tempore, vel voluptate.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            asperiores consectetur corporis dolorem doloremque ea hic ipsum
            magnam molestias nesciunt omnis, placeat quam quia repudiandae rerum
            sapiente tempore, vel voluptate.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            asperiores consectetur corporis dolorem doloremque ea hic ipsum
            magnam molestias nesciunt omnis, placeat quam quia repudiandae rerum
            sapiente tempore, vel voluptate.
          </p>
        </PageContent>
      </div>
    </div>
  );
};

AboutPage.defaultProps = {
  data: {},
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        sizes: PropTypes.shape({}),
      }),
    }),
  }),
};

export const query = graphql`
  query GatsbyImageSampleQuery {
    file(relativePath: { eq: "florian.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 1520) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;

export default AboutPage;
