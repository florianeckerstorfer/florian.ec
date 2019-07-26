import React, { ReactElement } from 'react';

import ArticleDate from '../ArticleDate/ArticleDate';
import IBlogNode from '../../types/IBlogNode';
import Label from '../Label/Label';
import { Link } from 'gatsby';
import styles from './ArticleListItem.module.css';

interface Props {
  article: IBlogNode;
}

const ArticleListItem: React.FC<Props> = ({ article }: Props): ReactElement => (
  <li className={styles.listItem}>
    <article>
      <Link className={styles.link} to={`/blog/${article.frontmatter.slug}`}>
        {article.frontmatter.title}
      </Link>
      <div className={styles.meta}>
        <Label>{article.frontmatter.category}</Label>
        <ArticleDate date={article.frontmatter.date} />
      </div>
    </article>
  </li>
);

export default ArticleListItem;
