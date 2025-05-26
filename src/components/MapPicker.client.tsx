'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	shadowSize: [41, 41],
});

function LocationMarker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
	const [position, setPosition] = useState<[number, number] | null>(null);
	useMapEvents({
		click(e) {
			setPosition([e.latlng.lat, e.latlng.lng]);
			onPick(e.latlng.lat, e.latlng.lng);
		},
	});
	return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
	return (
		<MapContainer
			center={[55.7558, 37.6173]}
			zoom={11}
			className="h-full w-full"
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker onPick={onPick} />
		</MapContainer>
	);
}
