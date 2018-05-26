/* eslint-disable class-methods-use-this */
/* global graphql */

import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader/PageHeader';
import ConcertGrid from '../components/ConcertGrid/ConcertGrid';

import concertData from '../data/concerts';

import './concerts.scss';
import '../components/PageBar/pageBar.scss';
import buildConcertsObject from '../util/buildConcertsObject';
import ConcertList from '../components/ConcertList/ConcertList';

const sizesPropType = PropTypes.shape({
  aspectRatio: PropTypes.number.isRequired,
  base64: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
});

const DEFAULT_DISPLAY = 'grid';

class ConcertsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      concerts: buildConcertsObject(concertData, props.data),
      display: DEFAULT_DISPLAY,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const concerts = buildConcertsObject(concertData, nextProps.data);
      this.setState({ concerts });
    }
  }

  isActiveDisplay(display) {
    return this.state.display === display;
  }

  renderDisplayLink(name, display) {
    const className = this.isActiveDisplay(display) ? 'active' : '';
    return (
      <Link to={`/concerts?display=${display}`} className={className}>
        {name}
      </Link>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Concerts" />
        <div>
          <PageHeader title="Concerts" />
          {this.isActiveDisplay('grid') ? (
            <ConcertGrid concerts={this.state.concerts} />
          ) : (
            <ConcertList concerts={this.state.concerts} />
          )}
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

ConcertsPage.contextTypes = {
  router: PropTypes.object,
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
