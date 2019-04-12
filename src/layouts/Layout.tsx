import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../components/Header/Header';
import './layout.css';
import '../variables.css';
import '../fonts/league-spartan.css';
import '../fonts/source-sans.css';
import '../fonts/source-serif.css';
import Footer from '../components/Footer/Footer';
import styles from './Layout.module.css';
import MainNav from '../components/MainNav/MainNav';

interface IProps {
  children: React.ReactNode;
  location?: Location;
  title?: string;
}

const Layout = ({ children }: IProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={styles.body}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <MainNav />
        <main className={styles.main} role="main">
          {children}
        </main>
        <Footer />
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
