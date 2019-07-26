import React, { ReactElement } from 'react';

import { Link } from 'gatsby';
import styles from './Footer.module.css';

const Footer: React.FC = (): ReactElement => (
  <footer className={styles.footer}>
    <p>
      Made with <span className={styles.heart}>♥</span> by Florian Eckerstorfer
      in Vienna, Europe. {new Date().getFullYear()}.{' '}
      <Link to="/imprint">Imprint</Link>.{' '}
      <Link to="/privacy">Privacy Policy</Link>.
    </p>
  </footer>
);

export default Footer;
