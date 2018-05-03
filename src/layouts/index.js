import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import 'prism-themes/themes/prism-duotone-dark.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './index.scss';

class Template extends React.PureComponent {
  render() {
    const { children, location } = this.props;
    return (
      <div>
        <Helmet>
          <link rel="icon" href="/favicon.png" />
        </Helmet>
        <div className="container">
          <Header isIndex={location.pathname === '/'} />
          {children()}
        </div>
        <Footer />
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Template.defaultProps = {
  location: { pathname: null },
};

export default Template;
