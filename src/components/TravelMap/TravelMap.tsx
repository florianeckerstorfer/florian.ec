import React, { useCallback } from 'react';

import Helmet from 'react-helmet';
import { ReactElement } from 'react';
import TravelFrontmatter, {
  TripLocation,
} from '../../types/ITravelFrontmatter';
import mapboxgl from 'mapbox-gl';
import style from './TravelMap.module.css';
import { createMap, loadMap, loadImage, hasImage } from '../../lib/Mapbox';
import MapboxGl from 'mapbox-gl';

interface Props {
  trips: TravelFrontmatter[];
}

const iconSortMap: { [propName: string]: number } = {
  airport: 6,
  beach: 4,
  campground: 2,
  castle: 2,
  city: 1,
  ferry: 6,
  mountain: 3,
  nationalpark: 2,
  rock: 5,
  train: 6,
};

const addLocationsToMap = async (
  map: MapboxGl.Map,
  locations: TripLocation[]
): Promise<void> => {
  map.addLayer({
    id: 'places',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: locations.map(
          (stop: TripLocation): GeoJSON.Feature<GeoJSON.Geometry> => {
            return {
              type: 'Feature',
              properties: {
                description: stop.name,
                icon: stop.icon,
                key: stop.icon ? iconSortMap[stop.icon] : 0,
              },
              geometry: {
                type: 'Point',
                coordinates: [stop.lng, stop.lat],
              },
            };
          }
        ),
      },
    },
    layout: {
      'icon-allow-overlap': false,
      'icon-image': 'fe-{icon}',
      'icon-size': 0.5,
      'symbol-sort-key': ['get', 'key'],
    },
  });
};

const getLocationsFromTrips = (trips: TravelFrontmatter[]): TripLocation[] =>
  trips.flatMap(trip => trip.locations);

const getIconsFromLocations = (locations: TripLocation[]) =>
  locations
    .map(location => location.icon)
    .filter((value, index, self) => self.indexOf(value) === index);

const loadIcons = async (map: MapboxGl.Map, icons: string[]): Promise<void> => {
  for (const icon of icons) {
    if (!hasImage(map, icon)) {
      await loadImage(map, { name: `fe-${icon}`, url: `/icons/${icon}.png` });
    }
  }
};

const handleMapMouseEnter = (map: MapboxGl.Map) => (): void => {
  map.getCanvas().style.cursor = 'pointer';
};

const handleMapMouseLeave = (map: MapboxGl.Map) => (): void => {
  map.getCanvas().style.cursor = '';
};

const handleMapClick = (map: MapboxGl.Map) => (e: any) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
};

const TravelMap: React.FC<Props> = ({ trips }: Props): ReactElement => {
  const mapRef = useCallback(async node => {
    if (node) {
      const accessToken: string = process.env.MAPBOX_TOKEN!;
      const map = createMap(accessToken, {
        container: node,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [16.563211, 48.121781],
        zoom: 1,
      });
      map.resize();

      await loadMap(map);

      const locations = getLocationsFromTrips(trips);
      await loadIcons(map, getIconsFromLocations(locations));

      addLocationsToMap(map, locations);

      map.on('click', 'places', handleMapClick(map));
      map.on('mouseenter', 'places', handleMapMouseEnter(map));
      map.on('mouseleave', 'places', handleMapMouseLeave(map));
    }
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Helmet>
      <div className={style.map} ref={mapRef} />
    </>
  );
};

export default TravelMap;
