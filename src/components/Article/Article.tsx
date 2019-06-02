import styles from './Article.module.css';
import React from 'react';
import H1 from '../H1/H1';
import ArticleNavigation from '../ArticleNavigation/ArticleNavigation';
import IBlogFrontmatter from '../../types/IBlogFrontmatter';
import IPageContext from '../../types/IPageContext';
import ArticleContent from '../ArticleContent/ArticleContent';
import ArticleDate from '../ArticleDate/ArticleDate';

interface IProps {
  post: {
    frontmatter: IBlogFrontmatter;
    excerpt?: string;
    html: string;
  };
  context: IPageContext;
}

function Article({ post, context }: IProps) {
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
}

export default Article;
