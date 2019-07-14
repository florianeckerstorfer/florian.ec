import IBlogNode from '../../types/IBlogNode';
import React from 'react';
import { Link } from 'gatsby';
import styles from './ArticleNavigation.module.css';

interface IProps {
  previous?: IBlogNode;
  next?: IBlogNode;
}

function ArticleNavigation({ previous, next }: IProps) {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {previous && (
          <li className={styles.previous}>
            <Link
              className={styles.link}
              to={`/blog/${previous.frontmatter.slug}`}
              rel="prev"
            >
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li className={styles.next}>
            <Link
              className={styles.link}
              to={`/blog/${next.frontmatter.slug}`}
              rel="next"
            >
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default ArticleNavigation;
