import styles from './Project.module.css';
import React from 'react';
import H1 from '../H1/H1';
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

function Project({ post, context }: IProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <H1>{post.frontmatter.title}</H1>
        <div className={styles.meta} />
        <ArticleContent post={post} />
      </header>
    </article>
  );
}

export default Project;
