import React from 'react';
import PropTypes from 'prop-types';

import './concertGridItem.scss';

const ConcertGridItem = ({ concert }) => (
  <div className={`concert-grid-item concert-grid-item--${concert.layout}`}>
    <figure style={{ backgroundImage: `url(${concert.sizes.src})` }}>
      <figcaption>{concert.title}</figcaption>
    </figure>
  </div>
);

// ConcertGridItem.defaultProps = {
//   concert: {
//     sizes: {},
//     title: null,
//   },
// };

ConcertGridItem.propTypes = {
  concert: PropTypes.shape({
    layout: PropTypes.string.isRequired,
    sizes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConcertGridItem;
