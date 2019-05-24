import React from 'react';
import styles from './ProjectList.module.css';
import IProjectList from '../../types/IProjectList';
import ProjectListItem from './ProjectListItem';

interface Props {
  projects: IProjectList;
}

const ProjectList: React.FC<Props> = ({ projects }: Props) => (
  <ul className={styles.list}>
    {projects.map(project => (
      <ProjectListItem key={project.node.fields.slug} project={project.node} />
    ))}
  </ul>
);

export default ProjectList;
