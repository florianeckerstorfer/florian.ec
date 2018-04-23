import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo/Logo';
import TopNav from '../TopNav/TopNav';

import './header.scss';

const scrollToTop = event => {
  if (window.scrollTo && window.pageYOffset > 0) {
    window.scrollTo(0, 0);
    event.stopPropagation();
    event.preventDefault();
  }
};

const Header = ({ isIndex }) => (
  <div className="header">
    <div className="header__logo">
      {isIndex ? (
        <a href="#" onClick={scrollToTop}>
          <Logo />
        </a>
      ) : (
        <Link onClick={scrollToTop} to="/">
          <Logo />
        </Link>
      )}
    </div>
    <div />
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
