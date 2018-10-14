import React from 'react';
import PropTypes from 'prop-types';

import './emoji.scss';

const Emoji = ({ emoji, label }) => (
  <span className="emoji" role="img" aria-label={label}>
    {emoji}
  </span>
);

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Emoji;
