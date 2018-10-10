import PropTypes from 'prop-types';
import React from 'react';

const CvListItemTimeSpan = ({ start, end }) => {
  if (start && end) {
    return (
      <span>
        {start} - {end}
      </span>
    );
  }
  if (start) {
    return <span>since {start}</span>;
  }
  if (end) {
    return <span>{end}</span>;
  }
  return null;
};

CvListItemTimeSpan.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

CvListItemTimeSpan.defaultProps = {
  start: null,
  end: null,
};

export default CvListItemTimeSpan;
