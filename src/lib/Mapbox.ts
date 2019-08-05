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

  public hasImage(name: string): boolean {
    return this.map.hasImage(name);
  }

  public loadImage(name: string, url: string) {
    return new Promise((resolve, reject) => {
      this.map.loadImage(url, (error: any, image: any) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        console.log(name);
        this.map.addImage(name, image);
        resolve({ name, image });
      });
    });
  }
}

export default Mapbox;
