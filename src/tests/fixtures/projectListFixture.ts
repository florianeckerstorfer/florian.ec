import IProjectList from '../../types/IProjectList';
import projectNodeFixture from './projectNodeFixture';

const emptyProjects: IProjectList = [];

const projects: IProjectList = [
  { node: projectNodeFixture.project },
  { node: projectNodeFixture.project },
  { node: projectNodeFixture.project },
];

export default { emptyProjects, projects };
