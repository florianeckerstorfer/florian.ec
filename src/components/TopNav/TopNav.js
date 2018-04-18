import Link from 'gatsby-link';
import React from 'react';

import './topNav.scss';

const TopNav = () => (
  <div className="top-nav">
    <Link to="/">Blog</Link>
    <Link to="/about">About</Link>
  </div>
);

export default TopNav;
