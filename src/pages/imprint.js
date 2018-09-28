import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';
import Layout from '../components/Layout/Layout';

const ImprintPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title="Imprint" />
    <div>
      <PageHeader title="Imprint" />
      <PageContent>
        <div className="h-card">
          <div>
            <strong className="p-name">Florian Eckerstorfer</strong>
          </div>
          <div className="p-street-address">Sobieskigasse 12</div>
          <div>
            <span className="p-postal-code">1090</span>{' '}
            <span className="p-locality">Vienna</span>
          </div>
          <div className="p-country-name">Austria</div>
          <div>
            <a href="florian@eckerstorfer.co" className="u-email">
              florian@eckerstorfer.co
            </a>
          </div>
        </div>
      </PageContent>
    </div>
  </Layout>
);

ImprintPage.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default ImprintPage;
