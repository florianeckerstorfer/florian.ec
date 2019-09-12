import React, { ReactElement } from 'react';

import IProjectNode from '../../types/IProjectNode';
import Label from '../Label/Label';
import { Link } from 'gatsby';
import styles from './ProjectListItem.module.css';

export interface Props {
  project: IProjectNode;
}

const ProjectListItem: React.FC<Props> = ({ project }: Props): ReactElement => (
  <li className={styles.project}>
    <div className={styles.title}>
      {project.frontmatter.link ? (
        <>
          <span role="img" aria-label="link">
            🔗
          </span>{' '}
          <a
            href={project.frontmatter.link}
            className={styles.titleLink}
            target="_blank"
            rel="noopener"
          >
            {project.frontmatter.title}
          </a>
        </>
      ) : (
        <Link
          to={`/projects/${project.fields.slug}`}
          className={styles.titleLink}
        >
          {project.frontmatter.title}
        </Link>
      )}
      {!project.frontmatter.active && <Label inverse>Inactive</Label>}
    </div>
    {project.frontmatter.link && (
      <div className={styles.url}>
        <a
          href={project.frontmatter.link}
          className={styles.urlLink}
          target="_blank"
          rel="noopener"
        >
          {project.frontmatter.link.replace(/^(https?:\/\/)/, '')}
        </a>
      </div>
    )}
    {project.frontmatter.description && (
      <div className={styles.description}>
        {project.frontmatter.description}
      </div>
    )}
    {project.frontmatter.tags &&
      project.frontmatter.tags.map(tag => <Label key={tag}>{tag}</Label>)}
  </li>
);

export default ProjectListItem;
