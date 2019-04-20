import styles from './Article.module.css';
import React from 'react';
import H1 from '../H1/H1';
import ArticleNavigation from '../ArticleNavigation/ArticleNavigation';
import IBlogFrontmatter from '../../types/IBlogFrontmatter';
import IPageContext from '../../types/IPageContext';
import ArticleContent from '../ArticleContent/ArticleContent';

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
      <header className={styles.header}>
        <H1>{post.frontmatter.title}</H1>
      </header>
      <aside className={styles.meta}>{post.frontmatter.date}</aside>
      <ArticleContent post={post} />
      <ArticleNavigation previous={previous} next={next} />
    </article>
  );
}

export default Article;
