"use client";

import { MapContainer, TileLayer, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

const darkMapStyle = {
  filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)',
};

interface MapPoint {
  position: [number, number];
  status: 'active' | 'checking' | 'closed';
}

const points: MapPoint[] = [
  // Центральный район
  { position: [55.751244, 37.618423], status: 'active' },
  { position: [55.753215, 37.622504], status: 'checking' },
  { position: [55.748012, 37.600231], status: 'closed' },
  { position: [55.755814, 37.617635], status: 'active' },
  // Добавляем новые точки
  { position: [55.757890, 37.633210], status: 'active' }, // Чистые пруды
  { position: [55.745623, 37.612456], status: 'checking' }, // Якиманка
  { position: [55.761234, 37.625789], status: 'closed' }, // Мещанский
  { position: [55.747890, 37.581234], status: 'active' }, // Пресненский
  { position: [55.738912, 37.629012], status: 'checking' }, // Замоскворечье
  { position: [55.763421, 37.642345], status: 'closed' }, // Басманный
  { position: [55.741234, 37.652345], status: 'active' }, // Таганский
  { position: [55.759012, 37.592345], status: 'checking' }, // Арбат
];

const getCircleStyle = (status: string) => {
  const baseStyle = {
    weight: 1.5,
    fillOpacity: 0.5,
  };

  switch (status) {
    case 'active':
      return {
        ...baseStyle,
        color: '#ff1500',
        fillColor: '#ff1500',
        fillOpacity: 0.9,
        weight: 2,
      };
    case 'checking':
      return {
        ...baseStyle,
        color: '#4444ff',
        fillColor: '#4444ff',
        fillOpacity: 0.7,
        weight: 2
      };
    case 'closed':
      return {
        ...baseStyle,
        color: '#22d515',
        fillColor: '#22d515',
        fillOpacity: 0.4,
      };
    default:
      return baseStyle;
  }
};

export default function MapPreview() {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Отключаем зум и перетаскивание для превью
      mapRef.current.dragging.disable();
      mapRef.current.touchZoom.disable();
      mapRef.current.doubleClickZoom.disable();
      mapRef.current.scrollWheelZoom.disable();
      mapRef.current.boxZoom.disable();
      mapRef.current.keyboard.disable();
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[55.751244, 37.618423]}
        zoom={13}
        style={{ height: '100%', width: '100%', ...darkMapStyle }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point, index) => (
          <div key={index}>
            {point.status === 'active' && (
              <Circle
                center={point.position}
                radius={300}
                pathOptions={{
                  color: '#ff1500',
                  fillColor: '#ff1500',
                  fillOpacity: 0.4,
                  weight: 1,
                }}
                className="circle-active"
              />
            )}
            <Circle
              center={point.position}
              radius={50}
              pathOptions={getCircleStyle(point.status)}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  );
} 