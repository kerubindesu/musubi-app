import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { RiExternalLinkLine } from 'react-icons/ri';

// Memperbaiki isu icon marker yang tidak muncul
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MyMap = ({ latitude, longitude }) => {
  return (
    <>
      <MapContainer center={[latitude, longitude]} zoom={13} style={{ zIndex: 1 }} scrollWheelZoom={false} className="h-[16rem] lg:h-[26rem] rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Lokasi terpilih berada pada latitude {latitude} dan longitude {longitude}.
          </Popup>
        </Marker>
      </MapContainer>
      <Link
        to={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="_blank"
        className="mt-4 text-sky-500 flex justify-start items-center gap-1"
      >
        <div className="text-base">Buka di Google Maps</div>
        <RiExternalLinkLine className="text-lg" />
      </Link>
    </>
  );
};

export default MyMap;