import { Link } from 'gatsby';
import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Link className={styles.logo} to="/">
      FE
    </Link>
    .
  </header>
);

export default Header;
