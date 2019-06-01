import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'gatsby';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with <span className={styles.heart}>♥</span> by Florian
        Eckerstorfer in Vienna, Europe. {new Date().getFullYear()}.{' '}
        <Link to="/imprint">Imprint</Link>.{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </footer>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
