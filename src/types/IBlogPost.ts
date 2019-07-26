import IBlogFrontmatter from './IBlogFrontmatter';

interface IBlogPost {
  frontmatter: IBlogFrontmatter;
  excerpt?: string;
  html: string;
}

export default IBlogPost;
