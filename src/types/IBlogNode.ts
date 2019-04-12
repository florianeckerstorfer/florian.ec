import IBlogFrontmatter from './IBlogFrontmatter';

export default interface IBlogNode {
  frontmatter: IBlogFrontmatter;
  fields: {
    slug: string;
  };
  excerpt: string;
}
