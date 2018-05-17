import buildConcertsObjectForYear from './buildConcertsObjectForYear';

const buildConcertsObject = (concertData, data) => ({
  2018: buildConcertsObjectForYear(concertData, 2018, data),
  2017: buildConcertsObjectForYear(concertData, 2017, data),
  2016: buildConcertsObjectForYear(concertData, 2016, data),
  2015: buildConcertsObjectForYear(concertData, 2015, data),
  2014: buildConcertsObjectForYear(concertData, 2014, data),
});

export default buildConcertsObject;
