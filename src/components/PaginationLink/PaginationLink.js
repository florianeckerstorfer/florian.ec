import Link from 'gatsby-link';
import React from 'react';
import PropTypes from 'prop-types';

const PaginationLink = ({ test, children, url }) => {
  if (!test) {
    return (
      <Link className="pagination__link" to={url}>
        {children}
      </Link>
    );
  }
  return <span className="pagination__link">{children}</span>;
};

PaginationLink.propTypes = {
  children: PropTypes.element.isRequired,
  test: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default PaginationLink;
