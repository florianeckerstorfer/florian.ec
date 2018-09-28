import React from 'react';
import PropTypes from 'prop-types';

import PaginationLink from '../PaginationLink/PaginationLink';
import './pagination.scss';

const Pagination = ({
  first,
  index,
  last,
  nextUrl,
  pageCount,
  previousUrl,
}) => (
  <div className="pagination">
    <PaginationLink test={first} url={previousUrl}>
      <span>
        <span role="img">☜</span>
        Previous Page
      </span>
    </PaginationLink>
    <div>
      {index} / {pageCount}
    </div>
    <PaginationLink test={last} url={nextUrl}>
      <span>
        Next Page
        <span role="img">☞</span>
      </span>
    </PaginationLink>
  </div>
);

Pagination.propTypes = {
  first: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  nextUrl: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
  previousUrl: PropTypes.string.isRequired,
};

export default Pagination;
