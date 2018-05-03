import Helmet from 'react-helmet';
import React from 'react';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';

const TravelPage = () => (
  <div>
    <Helmet title="Travel" />
    <div>
      <PageHeader title="Travel" />
      <PageContent>
        <p>Travel Map</p>
      </PageContent>
    </div>
  </div>
);

export default TravelPage;
