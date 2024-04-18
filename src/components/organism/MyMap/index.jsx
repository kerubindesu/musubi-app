import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Style } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Link } from 'react-router-dom';

const MyMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Membuat peta OpenLayers
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        // Layer titik
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
                name: 'Titik',
              }),
            ],
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 8,
              fill: new Fill({ color: 'red' }),
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 10
      })
    });

    return () => {
      // Membersihkan peta saat komponen tidak lagi digunakan
      map.setTarget(undefined);
    };
  }, [latitude, longitude]);

  return (
    <Link to={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank">
        <div id="map" className="h-[16rem] lg:h-[26rem] w-full">
        {/* Container untuk peta */}
        </div>
    </Link>
  );
};

export default MyMap;