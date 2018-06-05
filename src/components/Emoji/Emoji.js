import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ emoji, label }) => (
  <span role="img" aria-labelledby={label}>
    {emoji}
  </span>
);

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Emoji;
