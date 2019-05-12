import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/Layout';
import SEO from '../components/SEO/SEO';
import H1 from '../components/H1/H1';

const ContactPage: React.FC = () => (
  <Layout>
    <SEO title="Page two" />
    <H1>Contact</H1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default ContactPage;
