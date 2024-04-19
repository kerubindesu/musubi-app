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
import { RiExternalLinkLine } from 'react-icons/ri';

const MyMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Membuat peta OpenLayers
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              'Data under <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a>'
            ]
          })
        }),
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

    return () => map.setTarget(undefined); // Membersihkan peta saat komponen tidak lagi digunakan
  }, [latitude, longitude]);

  return (
    <>
      <div id="map" className="h-[16rem] lg:h-[26rem] w-full">
        {/* Container untuk peta */}
      </div>
      <Link
        to={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="_blank"
        className="my-4 text-blue-600 underline underline-offset-4 flex justify-start items-center gap-1"
      >
        <div className="text-base">Buka di Google Maps</div>
        <RiExternalLinkLine className="text-lg" />
      </Link>
    </>
  );
};

export default MyMap;