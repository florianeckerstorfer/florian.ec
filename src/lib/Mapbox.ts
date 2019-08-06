import MapboxGl, { MapboxOptions } from 'mapbox-gl';

export const createMap = (
  accessToken: string,
  options?: MapboxOptions
): MapboxGl.Map => {
  MapboxGl.accessToken = accessToken;
  return new MapboxGl.Map(options);
};

export const loadMap = (map: MapboxGl.Map) =>
  new Promise(resolve => map.on('load', () => resolve()));

export const hasImage = (map: MapboxGl.Map, name: string): boolean =>
  map.hasImage(name);

export const loadImage = (
  map: MapboxGl.Map,
  { name, url }: { name: string; url: string }
) =>
  new Promise((resolve, reject) => {
    map.loadImage(url, (error: any, image: any) => {
      if (error) {
        console.error(error);
        reject(error);
        return;
      }
      map.addImage(name, image);
      resolve({ name, image });
    });
  });
