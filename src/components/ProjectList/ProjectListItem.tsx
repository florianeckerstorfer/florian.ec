import React, { ReactElement } from 'react';
import IProjectNode from '../../types/IProjectNode';
import { Link } from 'gatsby';
import styles from './ProjectListItem.module.css';
import Label from '../Label/Label';

export interface Props {
  project: IProjectNode;
}

const ProjectListItem: React.FC<Props> = ({ project }: Props): ReactElement => (
  <li className={styles.project}>
    <div className={styles.title}>
      <Link to={`/projects/${project.fields.slug}`} className={styles.link}>
        {project.frontmatter.title}
      </Link>
      {!project.frontmatter.active && <Label inverse>Inactive</Label>}
    </div>
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
