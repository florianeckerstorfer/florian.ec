import React from 'react';
import PropTypes from 'prop-types';

const CvListItemOrganiation = ({ organisation }) =>
  organisation.url ? (
    <a href={organisation.url}>
      <strong>{organisation.name}</strong>
    </a>
  ) : (
    <strong>{organisation.name}</strong>
  );

const OrganisationPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

CvListItemOrganiation.propTypes = OrganisationPropType.isRequired;

export default CvListItemOrganiation;
