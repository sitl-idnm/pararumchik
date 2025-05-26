'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, DivIcon } from 'leaflet'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
	open: 'bg-red-600',
	closed: 'bg-green-600',
	checking: 'bg-yellow-400',
}

const CATEGORIES = [
	'наркотики',
	'притоны',
	'проституция',
	'нелегальные бары',
]

const STATUS = [
	{ value: 'open', label: 'Открыто' },
	{ value: 'closed', label: 'Закрыто' },
	{ value: 'checking', label: 'На проверке' },
]

interface Location {
	id: string
	lat: number
	lng: number
	title: string
	description: string
	status: 'open' | 'closed' | 'checking'
	category: string
}

const CATEGORY_COLORS: Record<string, string> = {
	'наркотики': '#dc2626', // красный
	'притоны': '#2563eb',   // синий
	'проституция': '#db2777', // розовый
	'нелегальные бары': '#7c3aed', // фиолетовый
	'default': '#facc15', // жёлтый
};

function getMarkerIconByCategory(category: string, status: string) {
	const color = CATEGORY_COLORS[category] || CATEGORY_COLORS['default'];
	const border = status === 'checking' ? '#facc15' : status === 'closed' ? '#16a34a' : '#222';
	return new DivIcon({
		className: '',
		html: `<div style="background:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:3px solid ${border};"><div style="width:18px;height:18px;border-radius:50%;background:${color};"></div></div>`
	});
}

export default function Map() {
	const [locations, setLocations] = useState<Location[]>([])
	const [category, setCategory] = useState<string>('')
	const [status, setStatus] = useState<string>('')
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		if (typeof window !== 'undefined') {
			const userReports = JSON.parse(localStorage.getItem('reports') || '[]')
			const userLocations = userReports
				.filter((r: any) => r.coords && r.status === 'open')
				.map((r: any) => ({
					id: r.id,
					lat: r.coords.lat,
					lng: r.coords.lng,
					title: r.category,
					description: r.description,
					status: r.status,
					category: r.category,
				}))
			setLocations(userLocations)
		}
		return () => setLocations([])
	}, [])

	if (!isMounted) {
		return (
			<div className="h-screen w-full flex items-center justify-center bg-gray-50">
				<p className="text-xl">Загрузка карты...</p>
			</div>
		)
	}

	const filtered = locations.filter(
		(loc) =>
			(!category || loc.category === category) &&
			(!status || loc.status === status)
	)

	return (
		<div className="h-screen w-full flex flex-col md:flex-row">
			{/* Панель фильтров */}
			<aside className="w-full md:w-64 bg-gray-800 shadow-lg z-10 p-4 md:block border-r border-gray-700">
				<h2 className="font-bold text-lg mb-4 text-white">Фильтры</h2>
				<div className="mb-4">
					<label className="block mb-1 font-medium text-gray-300">Категория</label>
					<select
						className="w-full border rounded p-2 bg-gray-700 text-white border-gray-600"
						value={category}
						onChange={e => setCategory(e.target.value)}
					>
						<option value="">Все</option>
						{CATEGORIES.map(cat => (
							<option key={cat} value={cat}>{cat}</option>
						))}
					</select>
				</div>
				<div>
					<label className="block mb-1 font-medium text-gray-300">Статус</label>
					<select
						className="w-full border rounded p-2 bg-gray-700 text-white border-gray-600"
						value={status}
						onChange={e => setStatus(e.target.value)}
					>
						<option value="">Все</option>
						{STATUS.map(st => (
							<option key={st.value} value={st.value}>{st.label}</option>
						))}
					</select>
				</div>
			</aside>
			{/* Карта */}
			<div className="flex-1 h-full">
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
					{filtered.map((location) => (
						<Marker
							key={location.id}
							position={[location.lat, location.lng]}
							icon={getMarkerIconByCategory(location.category, location.status)}
						>
							<Popup>
								<div className="bg-gray-900 text-white p-2 rounded">
									<h3 className="font-bold text-lg mb-1">{location.title}</h3>
									<div className="mb-2 text-sm text-gray-400">Категория: {location.category}</div>
									<div className="mb-2 text-gray-200">{location.description}</div>
									<div className="text-xs text-gray-500">Статус: {STATUS.find(s => s.value === location.status)?.label}</div>
									<Link href={`/object/${location.id}`} className="text-blue-400 underline text-sm mt-2 inline-block">Подробнее</Link>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
		</div>
	)
}
