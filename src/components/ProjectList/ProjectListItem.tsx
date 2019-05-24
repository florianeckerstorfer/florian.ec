import React from 'react';
import IProjectNode from '../../types/IProjectNode';
import { Link } from 'gatsby';
import styles from './ProjectListItem.module.css';
import Label from '../Label/Label';

interface IProps {
  project: IProjectNode;
}

const ProjectListItem: React.FC<IProps> = ({ project }: IProps) => {
  return (
    <li className={styles.project}>
      <div className={styles.title}>
        <Link
          to={`/projects/${project.frontmatter.slug}`}
          className={styles.link}
        >
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
};

export default ProjectListItem;
