import React, { ReactElement } from 'react';
import IBlogNode from '../../types/IBlogNode';
import styles from './ArticleListItem.module.css';
import Label from '../Label/Label';
import ArticleDate from '../ArticleDate/ArticleDate';
import { Link } from 'gatsby';

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
