import React from 'react';
import styles from './MainNav.module.css';
import { Link } from 'gatsby';

function MainNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">
            Blog
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/about">
            About
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
