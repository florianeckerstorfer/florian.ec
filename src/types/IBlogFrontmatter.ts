export default interface IBlogFrontmatter {
  category: string;
  date: string;
  description?: string;
  slug: string;
  tags?: string[];
  title: string;
}
