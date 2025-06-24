'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

export default function MapClient({ position }: { position: [number, number] }) {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='h-52 w-[250px] md:w-[500px] z-0'>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}