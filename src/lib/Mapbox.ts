import MapboxGl, { MapboxOptions } from 'mapbox-gl';

class Mapbox {
  public map: MapboxGl.Map;

  public constructor(accessToken: string, options?: MapboxOptions) {
    MapboxGl.accessToken = accessToken;
    this.map = new MapboxGl.Map(options);
  }

  public load() {
    return new Promise(resolve => this.map.on('load', () => resolve()));
  }

  public loadImage(name: string, url: string) {
    return new Promise((resolve, reject) => {
      this.map.loadImage(url, (error: any, image: any) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        this.map.addImage(name, image);
        resolve({ name, image });
      });
    });
  }
}

export default Mapbox;
