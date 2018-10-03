/* eslint-env jest */

import buildConcertsObject from './buildConcertsObject';

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

test('buildConcertsObject() should build concerts object', () => {
  const result = buildConcertsObject(concerts, data);
  expect(result[2018].length).toBe(1);
  expect(result[2017].length).toBe(1);
  expect(result[2016].length).toBe(2);
});
