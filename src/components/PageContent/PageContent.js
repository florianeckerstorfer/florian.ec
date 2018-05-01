import PropTypes from 'prop-types';
import React from 'react';

import './pageContent.scss';

const PageContent = ({ children }) => (
  <div className="page-content">{children}</div>
);

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
