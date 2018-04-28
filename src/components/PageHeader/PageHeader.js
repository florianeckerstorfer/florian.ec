import PropTypes from 'prop-types';
import React from 'react';

import PageTitle from '../PageTitle/PageTitle';

import './pageHeader.scss';

const PageHeader = ({ title }) => (
  <header className="page-header">
    <PageTitle title={title} />
  </header>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
