/* eslint-disable class-methods-use-this */
/* global graphql */

import Helmet from 'react-helmet';
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
  <div
    className="concerts__item"
    style={{
      gridColumn: concert.columns || null,
      gridRow: concert.rows || null,
    }}
  >
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

  buildConcertsYear(concerts, data) {
    return concerts.map(concert => ({
      ...concert,
      sizes: data.allFile.edges.find(
        edge => edge.node.relativePath === `${concert.name}.jpg`,
      ).node.childImageSharp.sizes,
    }));
  }

  buildConcerts(data) {
    console.log(data);
    return {
      2018: this.buildConcertsYear(concertData[2018], data),
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
            {this.state.concerts[2018].map(concert => (
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
        }),
      ),
    }),
  }),
};

export const query = graphql`
  query GatsbyImageConcertsQuery {
    allFile(filter: { absolutePath: { regex: "/concerts/img/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            sizes(maxWidth: 736) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;

export default ConcertsPage;
