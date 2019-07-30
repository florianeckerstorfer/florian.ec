import React, { useCallback } from 'react';

import Helmet from 'react-helmet';
import ITravelEdge from '../../types/ITravelEdge';
import { ReactElement } from 'react';
import mapbox from 'mapbox-gl';
import style from './TravelMap.module.css';

interface Props {
  travels: ITravelEdge[];
}

const TravelMap: React.FC<Props> = ({ travels }: Props): ReactElement => {
  const mapRef = useCallback(node => {
    if (node) {
      mapbox.accessToken =
        'pk.eyJ1IjoiZmxvcmlhbmVja2Vyc3RvcmZlciIsImEiOiJjaWxqdTNiM3QwMGFwdmptNDZjZHF2NjY1In0.AWaTE9ymrzzkEq0JNIg_ZQ';
      const map = new mapbox.Map({
        container: node,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [48.121781, 16.563211],
        zoom: 15,
      });
      map.on('load', () => {
        travels.forEach(trip => {
          if (
            trip &&
            trip.node &&
            trip.node.frontmatter &&
            trip.node.frontmatter.stops
          ) {
            console.log(trip.node.frontmatter.stops);
            map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      trip.node.frontmatter.stops.map(stop => [
                        stop.lat,
                        stop.lng,
                      ]),
                    ],
                  },
                },
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#888',
                'line-width': 8,
              },
            });
          }
        });
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
