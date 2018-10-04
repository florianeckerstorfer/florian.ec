import PropTypes from 'prop-types';

const SitePropType = PropTypes.shape({
  siteMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
});

export default SitePropType;
