import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';
import Layout from '../components/Layout/Layout';

const TravelPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title="Travel" />
    <div>
      <PageHeader title="Travel" />
      <PageContent>
        <p>Travel Map</p>
      </PageContent>
    </div>
  </Layout>
);

TravelPage.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default TravelPage;
