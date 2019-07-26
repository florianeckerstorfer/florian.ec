import React, { ReactElement } from 'react';

import Content from '../components/Content/Content';
import H1 from '../components/H1/H1';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';

const NotFoundPage: React.FC = (): ReactElement => (
  <Layout>
    <SEO title="404: Not found" />
    <H1>Not Found</H1>
    <Content>
      <p>This page does not exist. 🤷‍♂️</p>
      <p>Sorry.</p>
    </Content>
  </Layout>
);

export default NotFoundPage;
