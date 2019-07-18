import React, { ReactElement } from 'react';

import { Link } from 'gatsby';
import styles from './Header.module.css';

interface Props {
  siteTitle: string;
}

const Header: React.FC<Props> = ({  }: Props): ReactElement => (
  <header className={styles.header}>
    <Link className={styles.logo} to="/">
      FE
    </Link>
    .
  </header>
);

export default Header;
