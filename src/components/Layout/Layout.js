import 'prism-themes/themes/prism-duotone-dark.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.scss';
import LocationPropType from '../../propTypes/LocationPropType';

const Layout = ({ children, location }) => (
  <div>
    <Helmet>
      <link rel="icon" href="/favicon.png" />
      <html lang="en" />
    </Helmet>
    <div className="container">
      <Header isIndex={location.pathname === '/'} />
      {children}
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  location: LocationPropType.isRequired,
};

export default Layout;
