import moment from 'moment/moment';

const buildConcertsObjectForYear = (concerts, year, data) => {
  const flatConcerts = [];
  concerts.forEach(concert => {
    if (concert.bands) {
      concert.bands.forEach(band => {
        flatConcerts.push({ ...concert, ...band });
      });
    } else {
      flatConcerts.push(concert);
    }
  });
  return flatConcerts
    .filter(concert => new Date(concert.date).getFullYear() === year)
    .map(concert => {
      const date = moment(concert.date).format('MMMM D, YYYY');
      const image = data.allFile.edges.find(
        edge => edge.node.relativePath === `concerts/${concert.image}.jpg`
      );
      const title = `${concert.name} at ${concert.location} on ${date}`;
      return {
        ...concert,
        title,
        sizes: image ? image.node.childImageSharp.sizes : null,
      };
    });
};

export default buildConcertsObjectForYear;
