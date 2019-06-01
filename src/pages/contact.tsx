import React from 'react';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import H1 from '../components/H1/H1';
import Content from '../components/Content/Content';
import styles from './contact.module.css';
import classnames from 'classnames';

const ContactPage: React.FC = () => (
  <Layout>
    <SEO title="Contact" />
    <H1>Contact</H1>

    <Content>
      <div className="vcard">
        <a className="fn url" href="https://florian.ec">
          <strong>Florian Eckerstorfer</strong>
        </a>
        <div className={classnames(styles.adr, 'adr')}>
          <div className="street-address">Tigergasse 4</div>
          <span className="postal-code">1080</span>{' '}
          <span className="locality">Vienna</span>
          <div className="country-name">Austria</div>
        </div>
        <div>
          Email:{' '}
          <a href="mailto:florian@eckerstorfer.net" className="email">
            florian@eckerstorfer.net
          </a>
        </div>
      </div>
    </Content>
  </Layout>
);

export default ContactPage;
