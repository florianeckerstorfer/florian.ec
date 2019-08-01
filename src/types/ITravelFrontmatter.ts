export interface TripStop {
  lat: number;
  lng: number;
  name: string;
  icon?: string;
}

export default interface ITravelFrontmatter {
  date_start: string;
  date_end: string;
  title: string;
  link?: string;
  stops?: TripStop[];
}
