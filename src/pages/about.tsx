import React from 'react';

import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import H1 from '../components/H1/H1';

const AboutPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={['florian eckerstorfer', 'web developer', 'software developer']}
    />
    <H1>About</H1>
  </Layout>
);

export default AboutPage;
