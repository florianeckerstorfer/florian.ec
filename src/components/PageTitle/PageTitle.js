import PropTypes from 'prop-types';
import React from 'react';

import './pageTitle.scss';

const PageTitle = ({ title }) => <h1 className="page-title">{title}</h1>;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {};

export default PageTitle;
