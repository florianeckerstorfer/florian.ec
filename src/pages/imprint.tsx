import React, { ReactElement } from 'react';

import Content from '../components/Content/Content';
import H1 from '../components/H1/H1';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';

const ImprintPage: React.FC = (): ReactElement => (
  <Layout>
    <SEO title="Imprint" />
    <H1>Imprint</H1>
    <Content>
      <div className="vcard">
        <a className="fn url" href="https://florian.ec">
          <strong>Florian Eckerstorfer</strong>
        </a>
        <div className="adr">
          <div className="street-address">Tigergasse 4</div>
          <span className="locality">Vienna</span>,
          <span className="postal-code">1080</span>
          <div className="country-name">Austria</div>
        </div>
        <div>
          Email:{' '}
          <a href="mailto:florian@eckerstorfer.net" className="email">
            florian@eckerstorfer.net
          </a>
        </div>
      </div>
    </Content>
  </Layout>
);

export default ImprintPage;
