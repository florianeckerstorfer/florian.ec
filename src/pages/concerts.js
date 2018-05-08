/* eslint-disable class-methods-use-this */
/* global graphql */

import Helmet from 'react-helmet';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader/PageHeader';

import concertData from '../data/concerts';

import './concerts.scss';

const sizesPropType = PropTypes.shape({
  aspectRatio: PropTypes.number.isRequired,
  base64: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
});

const ConcertItem = ({ concert }) => (
  <div className={`concerts__item concerts__item--${concert.layout}`}>
    <figure style={{ backgroundImage: `url(${concert.sizes.src})` }}>
      <figcaption>{concert.title}</figcaption>
    </figure>
  </div>
);

ConcertItem.defaultProps = {
  concert: {
    sizes: {},
    title: null,
  },
};

ConcertItem.propTypes = {
  concert: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sizes: sizesPropType,
    title: PropTypes.string.isRequired,
  }),
};

class ConcertsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { concerts: this.buildConcerts(props.data) };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const concerts = this.buildConcerts(nextProps.data);
      this.setState({ concerts });
    }
  }

  buildConcertsYear(concerts, year, data) {
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
  }

  buildConcerts(data) {
    return {
      2018: this.buildConcertsYear(concertData, 2018, data),
      2017: this.buildConcertsYear(concertData, 2017, data),
      2016: this.buildConcertsYear(concertData, 2016, data),
      2015: this.buildConcertsYear(concertData, 2015, data),
      2014: this.buildConcertsYear(concertData, 2014, data),
    };
  }

  render() {
    return (
      <div>
        <Helmet title="Concerts" />
        <div>
          <PageHeader title="Concerts" />
          <div className="concerts">
            <div className="concerts__year">
              <h2>2018</h2>
            </div>
            {this.state.concerts[2018]
              .filter(concert => concert.sizes !== null)
              .map(concert => (
                <ConcertItem key={concert.name} concert={concert} />
              ))}
            <div className="concerts__year">
              <h2>2017</h2>
            </div>
            {this.state.concerts[2017]
              .filter(concert => concert.sizes !== null)
              .map(concert => (
                <ConcertItem key={concert.name} concert={concert} />
              ))}
            <div className="concerts__year">
              <h2>2016</h2>
            </div>
            {this.state.concerts[2016]
              .filter(concert => concert.sizes !== null)
              .map(concert => (
                <ConcertItem key={concert.name} concert={concert} />
              ))}
            <div className="concerts__year">
              <h2>2015</h2>
            </div>
            {this.state.concerts[2015]
              .filter(concert => concert.sizes !== null)
              .map(concert => (
                <ConcertItem key={concert.name} concert={concert} />
              ))}
            <div className="concerts__year">
              <h2>2014</h2>
            </div>
            {this.state.concerts[2014]
              .filter(concert => concert.sizes !== null)
              .map(concert => (
                <ConcertItem key={concert.name} concert={concert} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

ConcertsPage.defaultProps = {
  data: {
    allFile: {
      edges: [],
    },
  },
};

ConcertsPage.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            relativePath: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              sizes: sizesPropType,
            }),
          }),
        })
      ),
    }),
  }),
};

export const query = graphql`
  query GatsbyImageConcertsQuery {
    allFile(filter: { absolutePath: { regex: "/images/concerts/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            sizes(maxWidth: 1520) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;

export default ConcertsPage;
