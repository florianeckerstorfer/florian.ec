import styles from './Project.module.css';
import React, { ReactElement } from 'react';
import H1 from '../H1/H1';
import IBlogFrontmatter from '../../types/IBlogFrontmatter';
import ArticleContent from '../ArticleContent/ArticleContent';

export interface Props {
  project: {
    frontmatter: IBlogFrontmatter;
    excerpt?: string;
    html: string;
  };
}

const Project: React.FC<Props> = ({ project }: Props): ReactElement => (
  <article className={styles.article}>
    <header className={styles.header}>
      <H1>{project.frontmatter.title}</H1>
      <div className={styles.meta} />
      <ArticleContent post={project} />
    </header>
  </article>
);

export default Project;
