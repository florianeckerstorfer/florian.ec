import moment from 'moment/moment';
import uniq from 'lodash/uniq';

import buildConcertsObjectForYear from './buildConcertsObjectForYear';

const getYears = concertData =>
  uniq(
    concertData.map(concert =>
      parseInt(moment(concert.date).format('YYYY'), 10)
    )
  );

const buildConcertsObject = (concertData, data) => {
  const yearly = {};
  getYears(concertData).forEach(year => {
    yearly[year] = buildConcertsObjectForYear(concertData, year, data);
  });
  return yearly;
};

export default buildConcertsObject;
