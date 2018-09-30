/* eslint-disable class-methods-use-this */

import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import ConcertGrid from '../components/ConcertGrid/ConcertGrid';
import '../components/PageBar/pageBar.scss';
import PageHeader from '../components/PageHeader/PageHeader';
import concertData from '../data/concerts';
import Layout from '../components/Layout/Layout';
import buildConcertsObject from '../util/buildConcertsObject';
import './concerts.scss';

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
    const { data } = this.props;
    if (data !== nextProps.data) {
      const concerts = buildConcertsObject(concertData, nextProps.data);
      this.setState({ concerts });
    }
  }

  render() {
    const { location } = this.props;
    const { concerts } = this.state;
    return (
      <Layout location={location}>
        <div>
          <Helmet title="Concerts" />
          <div>
            <PageHeader title="Concerts" />
            <ConcertGrid concerts={concerts} />
          </div>
        </div>
      </Layout>
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
  location: PropTypes.shape().isRequired,
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
  router: PropTypes.shape(),
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
