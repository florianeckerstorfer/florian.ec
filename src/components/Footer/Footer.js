import React from 'react';
import Link from 'gatsby-link';

import './footer.scss';

const Footer = () => (
  <footer className="footer">
    Made by Florian Eckerstorfer in Vienna, Europe.
    <Link to="/imprint">Imprint</Link>
    <Link to="/privacy">Privacy Policy</Link>
  </footer>
);

export default Footer;
