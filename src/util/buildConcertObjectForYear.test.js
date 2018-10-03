/* eslint-env jest */

import buildConcertsObjectForYear from './buildConcertsObjectForYear';

const concerts = [
  {
    date: '2018-04-15',
    location: 'Chelsea, Vienna',
    name: 'Sunflower Bean',
    image: '2018-04-15-sunflower-bean',
    layout: 'portrait',
  },
  {
    date: '2017-08-21',
    image: '2017-08-21-perfume-genius',
    name: 'Perfume Genius',
    location: 'Arena, Vienna',
    layout: 'landscape-full',
  },
  {
    date: '2016-03-03',
    location: 'By:Larm Festival, Oslo',
    bands: [
      {
        name: 'Dolores Haze',
        image: '2016-03-03-bylarm-dolores-haze',
        layout: 'landscape',
      },
      {
        name: 'Abra',
        image: '2016-03-03-by-larm-abra',
        layout: 'landscape',
      },
    ],
  },
];
const data = {
  allFile: {
    edges: [
      {
        node: {
          relativePath: 'concerts/2018-04-15-sunflower-bean.jpg',
          childImageSharp: {
            sizes: {
              src: '/static/2018-04-15-sunflower-bean.jpg',
            },
          },
        },
      },
    ],
  },
};

test('buildConcertObjectForYear should build concert object for the given year', () => {
  const result = buildConcertsObjectForYear(concerts, 2018, data);
  expect(result.length).toBe(1);
  expect(result[0].name).toBe(concerts[0].name);
  expect(result[0].title).toBe(
    'Sunflower Bean at Chelsea, Vienna on April 15, 2018'
  );
  expect(result[0].sizes.src).toBe(
    data.allFile.edges[0].node.childImageSharp.sizes.src
  );
});

test('buildConcertObjectForYear should build concert object for festivals', () => {
  const result = buildConcertsObjectForYear(concerts, 2016, data);
  expect(result.length).toBe(2);
  expect(result[0].title).toBe(
    'Dolores Haze at By:Larm Festival, Oslo on March 3, 2016'
  );
});
