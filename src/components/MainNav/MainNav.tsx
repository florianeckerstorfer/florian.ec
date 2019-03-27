import React from 'react';
import styles from './MainNav.module.css';
import { Link } from 'gatsby';

function MainNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/">Blog</Link>
        </li>
        <li className={styles.item}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.item}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
