export interface TripLocation {
  icon: string;
  lat: number;
  lng: number;
  name: string;
}

export default interface TravelFrontmatter {
  date_end: string;
  date_start: string;
  link?: string;
  locations: TripLocation[];
  title: string;
}
