/* eslint-disable class-methods-use-this */
/* global graphql */

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../components/PageHeader/PageHeader';
import ConcertGrid from '../components/ConcertGrid/ConcertGrid';

import concertData from '../data/concerts';

import './concerts.scss';
import '../components/PageBar/pageBar.scss';
import buildConcertsObject from '../util/buildConcertsObject';

const sizesPropType = PropTypes.shape({
  aspectRatio: PropTypes.number.isRequired,
  base64: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
});

class ConcertsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      concerts: buildConcertsObject(concertData, props.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const concerts = buildConcertsObject(concertData, nextProps.data);
      this.setState({ concerts });
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Concerts" />
        <div>
          <PageHeader title="Concerts" />
          <ConcertGrid concerts={this.state.concerts} />
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
