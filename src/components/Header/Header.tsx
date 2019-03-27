import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Header.module.css';

interface IProps {
  siteTitle: string;
}

const Header = ({ siteTitle }: IProps) => (
  <header className={styles.header}>
    <Link className={styles.logo} to="/">
      {siteTitle}
    </Link>
    .
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
