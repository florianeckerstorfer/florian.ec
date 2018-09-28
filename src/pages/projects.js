import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout/Layout';
import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';

const ProjectsPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title="Projects Florian Eckerstorfer" />
    <div>
      <PageHeader title="Projects" />
      <PageContent>
        <p>
          Over the years I have created a lot of stuff on the Internet. Here is
          a (probably) incomplete list.
        </p>
      </PageContent>
    </div>
  </Layout>
);

ProjectsPage.propTypes = {
  location: PropTypes.shape().isRequired,
};

export default ProjectsPage;
