import React from 'react';

import Layout from '../layouts/Layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={['florian eckerstorfer', 'web developer', 'software developer']}
    />
    <h1>About</h1>
  </Layout>
);

export default IndexPage;
