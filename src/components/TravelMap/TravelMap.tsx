import React, { useCallback } from 'react';

import Helmet from 'react-helmet';
import Mapbox from '../../lib/Mapbox';
import { ReactElement } from 'react';
import TravelFrontmatter, {
  TripLocation,
} from '../../types/ITravelFrontmatter';
import mapboxgl from 'mapbox-gl';
import style from './TravelMap.module.css';
import { async } from 'q';

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
  mapbox: Mapbox,
  locations: TripLocation[]
): Promise<void> => {
  mapbox.map.addLayer({
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

const loadIcons = async (mapbox: Mapbox, icons: string[]): Promise<void> => {
  for (const icon of icons) {
    if (!mapbox.hasImage(icon)) {
      await mapbox.loadImage(`fe-${icon}`, `/icons/${icon}.png`);
    }
  }
};

const TravelMap: React.FC<Props> = ({ trips }: Props): ReactElement => {
  const mapRef = useCallback(async node => {
    if (node) {
      const accessToken: string = process.env.MAPBOX_TOKEN!;
      const mapbox = new Mapbox(accessToken, {
        container: node,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [16.563211, 48.121781],
        zoom: 1,
        pitchWithRotate: false,
      });
      mapbox.map.resize();

      await mapbox.load();

      const locations = getLocationsFromTrips(trips);
      await loadIcons(mapbox, getIconsFromLocations(locations));

      addLocationsToMap(mapbox, locations);

      mapbox.map.on('click', 'places', (e: any) => {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(mapbox.map);
      });

      mapbox.map.on('mouseenter', 'places', () => {
        mapbox.map.getCanvas().style.cursor = 'pointer';
      });

      mapbox.map.on('mouseleave', 'places', () => {
        mapbox.map.getCanvas().style.cursor = '';
      });
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
