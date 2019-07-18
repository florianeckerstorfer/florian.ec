import React, { ReactElement } from 'react';

import IProjectList from '../../types/IProjectList';
import ProjectListItem from './ProjectListItem';
import styles from './ProjectList.module.css';

export interface Props {
  projects: IProjectList;
}

const ProjectList: React.FC<Props> = ({
  projects,
}: Props): ReactElement | null => {
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
