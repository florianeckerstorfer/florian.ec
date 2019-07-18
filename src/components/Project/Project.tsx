import React, { ReactElement } from 'react';

import ArticleContent from '../ArticleContent/ArticleContent';
import H1 from '../H1/H1';
import IBlogFrontmatter from '../../types/IBlogFrontmatter';
import styles from './Project.module.css';

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
