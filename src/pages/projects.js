import Helmet from 'react-helmet';
import React from 'react';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';

const ProjectsPage = () => (
  <div>
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
  </div>
);

export default ProjectsPage;
