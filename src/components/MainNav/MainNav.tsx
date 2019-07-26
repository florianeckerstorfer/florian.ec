import React, { ReactElement } from 'react';

import { Link } from 'gatsby';
import styles from './MainNav.module.css';

const MainNav: React.FC = (): ReactElement => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link className={styles.link} to="/">
          Blog
        </Link>
      </li>
      <li className={styles.item}>
        <Link className={styles.link} to="/projects">
          Projects
        </Link>
      </li>
      <li className={styles.item}>
        <Link className={styles.link} to="/about">
          About
        </Link>
      </li>
    </ul>
  </nav>
);

export default MainNav;
