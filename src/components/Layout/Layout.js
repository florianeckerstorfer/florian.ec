import 'prism-themes/themes/prism-duotone-dark.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.scss';

const Template = ({ children, location }) => (
  <div>
    <Helmet>
      <link rel="icon" href="/favicon.png" />
    </Helmet>
    <div className="container">
      <Header isIndex={location.pathname === '/'} />
      {children}
    </div>
    <Footer />
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Template;
