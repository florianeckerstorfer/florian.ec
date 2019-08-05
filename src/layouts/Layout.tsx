import '../fonts/league-spartan.css';
import '../fonts/source-sans.css';
import '../fonts/source-serif.css';
import '../variables.css';
import './layout.css';
import './prism-night-owl.css';

import React, { ReactElement } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import MainNav from '../components/MainNav/MainNav';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Layout.module.css';
import utilCss from '../components/util.module.css';

interface Props {
  children: React.ReactNode;
  location?: Location;
  title?: string;
  pageTitle?: (props: { className?: string }) => React.ReactElement;
}

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export const renderLayout = ({ children, pageTitle }: Props) => (
  data: Data
) => (
  <div
    className={classnames(styles.body, {
      [styles.hasPageTitle]: Boolean(pageTitle),
    })}
  >
    <a href="#main" className={utilCss.visuallyHidden}>
      Go to content
    </a>
    <Header siteTitle={data.site.siteMetadata.title} />
    {pageTitle && pageTitle({ className: styles.pageTitle })}
    <MainNav />
    <main id="main" className={styles.main} tabIndex={-1} role="main">
      {children}
    </main>
    <Footer />
  </div>
);

const Layout: React.FC<Props> = ({
  children,
  pageTitle,
}: Props): ReactElement => (
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
    render={renderLayout({ children, pageTitle })}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
