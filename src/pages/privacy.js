import Helmet from 'react-helmet';
import React from 'react';

import PageContent from '../components/PageContent/PageContent';
import PageHeader from '../components/PageHeader/PageHeader';
import Emoji from '../components/Emoji/Emoji';

const ImprintPage = () => (
  <div>
    <Helmet title="Privacy Policy" />
    <div>
      <PageHeader title="Privacy Policy" />
      <PageContent>
        <p>
          This privacy policy applies to all my websites:{' '}
          <a href="https://florian.ec">florian.ec</a>,{' '}
          <a href="http://👏🏻.ws">
            <Emoji emoji="👏🏻" label="clap" />.ws
          </a>,{' '}
          <a href="http://👋🏻.ws">
            <Emoji emoji="👋🏻" label="wave" />.ws
          </a>, <a href="https://webadventures.at">webadventures.at</a>.
        </p>

        <p>
          <Emoji emoji="❌" label="x" />
          <Emoji emoji="🕳" label="hole" /> This website does not embed content
          from other websites.<br />
          <Emoji emoji="❌" label="x" />
          <Emoji emoji="🍪" label="cookie" /> This website does not store
          cookies in your browser.<br />
          <Emoji emoji="🌍" label="earth" /> This website is hosted on Netlify.
          You can read more about their{' '}
          <a href="https://www.netlify.com/gdpr/">GDPR</a> policy.<br />
          <Emoji emoji="️️️️🗃️" label="card file box" /> This website stores
          access logs, including your IP address, for up to 30 days.<br />
        </p>
      </PageContent>
    </div>
  </div>
);

export default ImprintPage;
