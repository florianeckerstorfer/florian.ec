import React from 'react';
import Link from 'gatsby-link';

import './footer.scss';

const Footer = () => (
  <footer className="footer h-card">
    Made by{' '}
    <a href="https://florian.ec" className="p-name u-url">
      Florian Eckerstorfer
    </a>{' '}
    in <span className="p-locality">Vienna</span>, Europe.{' '}
    <Link to="/imprint">Imprint</Link> <Link to="/privacy">Privacy Policy</Link>
  </footer>
);

export default Footer;
