import React from 'react';
import PropTypes from 'prop-types';

const ConcertList = ({ concerts }) => (
  <div>
    {Object.keys(concerts).map(year => (
      <div key={year} className="concert-list">
        <h2>{year}</h2>
        <ul className="concert-list__list">
          {concerts[year].map(concert => (
            <li key={concert.name}>{concert.title}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

ConcertList.propTypes = {
  concerts: PropTypes.shape(),
};

ConcertList.defaultProps = {
  concerts: {},
};

export default ConcertList;
