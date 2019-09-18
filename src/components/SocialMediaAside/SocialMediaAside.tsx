import React from 'react';
import styles from './SocialMediaAside.module.css';

function SocialMediaAside() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
      You can also follow me on{' '}
      <a rel="me" href="https://micro.florian.ec">
        Micro.blog
      </a>{' '}
      and{' '}
      <a rel="me" href="https://mastodon.social/@florianec">
        Mastodon
      </a>
      .
      </div>
    </div>
  );
}

export default SocialMediaAside;
