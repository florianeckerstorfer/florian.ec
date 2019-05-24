import React from 'react';
import styles from './ProjectList.module.css';
import IProjectList from '../../types/IProjectList';
import ProjectListItem from './ProjectListItem';

export interface IProps {
  projects: IProjectList;
}

const ProjectList: React.FC<IProps> = ({ projects }: IProps) => {
  if (projects.length === 0) {
    return null;
  }
  return (
    <ul className={styles.list}>
      {projects.map(project => (
        <ProjectListItem
          key={project.node.fields.slug}
          project={project.node}
        />
      ))}
    </ul>
  );
};

export default ProjectList;
