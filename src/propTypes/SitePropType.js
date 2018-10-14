import PropTypes from 'prop-types';

const SitePropType = PropTypes.shape({
  siteMetadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    siteUrl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
});

export default SitePropType;
