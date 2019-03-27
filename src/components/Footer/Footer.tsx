import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with <span className={styles.heart}>♥</span> by Florian
        Eckerstorfer in Vienna, Europe. {new Date().getFullYear()}.
      </p>
    </footer>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
