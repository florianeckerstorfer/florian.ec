import React from 'react';
import Link from 'gatsby-link';

import Emoji from '../Emoji/Emoji';

import './footer.scss';

const Footer = () => (
  <footer className="footer h-card">
    Made by{' '}
    <a href="https://florian.ec" className="p-name u-url">
      <Emoji emoji="👨🏼‍💻" label="developer" />Florian Eckerstorfer
    </a>{' '}
    in{' '}
    <span className="p-locality">
      <Emoji emoji="🎡" label="ferriswheel" /> Vienna
    </span>, Europe.
    <Link to="/imprint" className="footer__nav-link">
      Imprint
    </Link>
    <Link to="/privacy" className="footer__nav-link">
      Privacy Policy
    </Link>
  </footer>
);

export default Footer;
