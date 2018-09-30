import PropTypes from 'prop-types';
import React from 'react';
import ConcertGridItem from '../ConcertGridItem/ConcertGridItem';
import './concertGrid.scss';

const ConcertGrid = ({ concerts }) => (
  <div>
    {Object.keys(concerts)
      .reverse()
      .filter(
        year =>
          concerts[year].filter(concert => concert.sizes !== null).length > 0
      )
      .map(year => (
        <div key={`concert-${year}`} className="concert-grid">
          <div className="concert-grid__year">
            <h2>{year}</h2>
          </div>
          {concerts[year]
            .filter(concert => concert.sizes !== null)
            .map(concert => (
              <ConcertGridItem key={concert.name} concert={concert} />
            ))}
        </div>
      ))}
  </div>
);

ConcertGrid.propTypes = {
  concerts: PropTypes.shape(),
};

ConcertGrid.defaultProps = {
  concerts: {},
};

export default ConcertGrid;
