import IBlogNode from '../../types/IBlogNode';
import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import styles from './ArticleNavigation.module.css';

interface Props {
  previous?: IBlogNode;
  next?: IBlogNode;
}

const ArticleNavigation: React.FC<Props> = ({
  previous,
  next,
}: Props): ReactElement => (
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

export default ArticleNavigation;
