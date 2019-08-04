import React, { useCallback } from 'react';

import Helmet from 'react-helmet';
import ITravelEdge from '../../types/ITravelEdge';
import Mapbox from '../../lib/Mapbox';
import { ReactElement } from 'react';
import { TripStop } from '../../types/ITravelFrontmatter';
import mapboxgl from 'mapbox-gl';
import style from './TravelMap.module.css';

interface Props {
  travels: ITravelEdge[];
}

const iconSortMap: { [propName: string]: number } = {
  airport: 6,
  beach: 4,
  city: 1,
  mountain: 3,
  nationalpark: 2,
  rock: 5,
};

const addStops = async (mapbox: Mapbox, stops: TripStop[]): Promise<void> => {
  mapbox.map.addLayer({
    id: 'places',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: stops.map(
          (stop: TripStop): GeoJSON.Feature<GeoJSON.Geometry> => {
            console.log('stop.icon', stop.icon);
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
      'icon-image': '{icon}',
      'icon-size': 0.5,
      'icon-allow-overlap': false,
      'symbol-sort-key': ['get', 'key'],
    },
  });
};

const TravelMap: React.FC<Props> = ({ travels }: Props): ReactElement => {
  const mapRef = useCallback(async node => {
    if (node) {
      const accessToken =
        'pk.eyJ1IjoiZmxvcmlhbmVja2Vyc3RvcmZlciIsImEiOiJjaWxqdTNiM3QwMGFwdmptNDZjZHF2NjY1In0.AWaTE9ymrzzkEq0JNIg_ZQ';
      const mapbox = new Mapbox(accessToken, {
        container: node,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [16.563211, 48.121781],
        // center: [-77.038659, 38.931567],
        zoom: 1,
        pitchWithRotate: false,
      });
      mapbox.map.resize();
      await mapbox.load();

      await mapbox.loadImage('nationalpark', '/icons/nationalpark.png');
      await mapbox.loadImage('airport', '/icons/airport.png');
      await mapbox.loadImage('city', '/icons/city.png');
      await mapbox.loadImage('mountain', '/icons/mountain.png');
      await mapbox.loadImage('rock', '/icons/rock.png');

      let stops: TripStop[] = [];
      travels.forEach(trip => {
        if (trip.node.frontmatter.stops) {
          stops = stops.concat(trip.node.frontmatter.stops);
        }
      });
      addStops(mapbox, stops);

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
      <div className={style.map} ref={mapRef}></div>
    </>
  );
};

export default TravelMap;
