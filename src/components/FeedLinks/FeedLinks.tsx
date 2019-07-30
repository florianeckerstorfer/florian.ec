import React, { ReactElement } from 'react';

import H2 from '../H2/H2';
import styles from './FeedLinks.module.css';

const feeds = [
  { href: '/rss.xml', name: 'RSS' },
  { href: '/atom.xml', name: 'Atom' },
  { href: '/feed.json', name: 'JSON' },
];

const FeedLinks: React.FC = (): ReactElement => (
  <aside className={styles.container}>
    <H2 style="aside">Subscribe to new posts</H2>
    <ul className={styles.feeds}>
      {feeds.map(feed => (
        <li className={styles.feed} key={feed.href}>
          <a href={feed.href}>{feed.name}</a>
        </li>
      ))}
    </ul>
  </aside>
);

export default FeedLinks;
