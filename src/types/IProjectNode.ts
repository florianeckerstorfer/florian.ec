import IProjectFrontmatter from './IProjectFrontmatter';

export default interface IProjectNode {
  frontmatter: IProjectFrontmatter;
  fields: {
    slug: string;
  };
  excerpt: string;
}
