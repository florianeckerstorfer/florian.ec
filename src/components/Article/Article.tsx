import React, { ReactElement } from 'react';

import ArticleContent from '../ArticleContent/ArticleContent';
import ArticleDate from '../ArticleDate/ArticleDate';
import ArticleNavigation from '../ArticleNavigation/ArticleNavigation';
import H1 from '../H1/H1';
import IBlogFrontmatter from '../../types/IBlogFrontmatter';
import IPageContext from '../../types/IPageContext';
import styles from './Article.module.css';

interface Props {
  post: {
    excerpt?: string;
    frontmatter: IBlogFrontmatter;
    html: string;
  };
  context: IPageContext;
}

const Article: React.FC<Props> = ({ post, context }: Props): ReactElement => {
  const { previous, next } = context;

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <H1>{post.frontmatter.title}</H1>
        <div className={styles.meta}>
          <ArticleDate date={post.frontmatter.date} />
        </div>
      </div>
      <ArticleContent post={post} />
      <ArticleNavigation previous={previous} next={next} />
    </article>
  );
};

export default Article;
