export default interface ITravelFrontmatter {
  date_start: string;
  date_end: string;
  title: string;
  link?: string;
  stops?: Array<{
    lat: number;
    lng: number;
    name: string;
  }>;
}
