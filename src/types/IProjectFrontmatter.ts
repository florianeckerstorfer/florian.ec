export default interface IProjectFrontmatter {
  active: boolean;
  category: string;
  date: string;
  description?: string;
  link?: string;
  slug: string;
  tags?: string[];
  title: string;
}
