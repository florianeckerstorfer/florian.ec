import React, { ReactElement } from 'react';
import IBlogEdge from '../../types/IBlogEdge';
import { Link } from 'gatsby';
import styles from './ArticleList.module.css';
import Label from '../Label/Label';
import ArticleDate from '../ArticleDate/ArticleDate';

interface IProps {
  articles: IBlogEdge[];
}

function ArticleList({ articles }: IProps): ReactElement {
  return (
    <ul className={styles.list}>
      {articles.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <li className={styles.listItem} key={node.frontmatter.slug}>
            <article>
              <Link className={styles.link} to={node.frontmatter.slug}>
                {title}
              </Link>
              <div className={styles.meta}>
                <Label>{node.frontmatter.category}</Label>
                <ArticleDate date={node.frontmatter.date} />
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default ArticleList;
