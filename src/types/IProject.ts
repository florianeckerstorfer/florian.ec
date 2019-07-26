import IProjectFrontmatter from './IProjectFrontmatter';

interface IProject {
  frontmatter: IProjectFrontmatter;
  excerpt?: string;
  html: string;
}

export default IProject;
