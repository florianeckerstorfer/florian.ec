import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Header.module.css';

interface IProps {
  siteTitle: string;
}

function Header({ siteTitle }: IProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        FE
      </Link>
      .
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
