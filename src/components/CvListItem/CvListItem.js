import React from 'react';
import PropTypes from 'prop-types';
import CvListItemTimeSpan from './CvListItemTimeSpan';
import CvListItemOrganiation from './CvListItemOrganisation';

const CvListItem = ({
  position,
  organisation,
  location,
  start,
  end,
  children,
}) => (
  <li className="cv-list__item">
    <em className="cv-list__item__position">{position}</em>,{' '}
    {organisation && (
      <span>
        <CvListItemOrganiation organisation={organisation} />,{' '}
      </span>
    )}
    {location && (
      <span>
        <span className="cv-list__item__location">{location}</span>,{' '}
      </span>
    )}
    <CvListItemTimeSpan start={start} end={end} />
    <ul className="cv-list__item__description">{children}</ul>
  </li>
);

CvListItem.propTypes = {
  position: PropTypes.string.isRequired,
  organisation: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  location: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

CvListItem.defaultProps = {
  start: null,
  end: null,
  organisation: {
    name: null,
    url: null,
  },
  location: null,
};

export default CvListItem;
