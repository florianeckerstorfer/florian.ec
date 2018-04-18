import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo/Logo';
import TopNav from '../TopNav/TopNav';

import './header.scss';

const Header = ({ isIndex }) => (
  <div className="header">
    {isIndex ? (
      <Logo />
    ) : (
      <Link to="/">
        <Logo />
      </Link>
    )}
    <TopNav />
  </div>
);

Header.propTypes = {
  isIndex: PropTypes.bool,
};

Header.defaultProps = {
  isIndex: false,
};

export default Header;
