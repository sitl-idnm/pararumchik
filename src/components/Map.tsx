'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, DivIcon } from 'leaflet'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import defaultReports from '@/data/reports.json'

const STATUS_COLORS: Record<string, string> = {
	open: 'bg-primary',
	closed: 'bg-accent',
	checking: 'bg-primary/50',
	unchecked: 'bg-yellow-500'
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
	{ value: 'unchecked', label: 'Не проверен' }
]

interface Location {
	id: string
	lat: number
	lng: number
	title: string
	description: string
	status: 'open' | 'closed' | 'checking' | 'unchecked'
	category: string
}

const CATEGORY_COLORS: Record<string, string> = {
	'наркотики': '#d22515',
	'притоны': '#d22515',
	'проституция': '#d22515',
	'нелегальные бары': '#d22515',
	'default': '#d22515',
};

function getMarkerIconByCategory(category: string, status: string) {
	const color = CATEGORY_COLORS[category] || CATEGORY_COLORS['default'];
	const border = status === 'unchecked' ? '#ffd700' : status === 'checking' ? '#d22515' : status === 'closed' ? '#dcd9d0' : '#080808';
	return new DivIcon({
		className: '',
		html: `<div style="background:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:3px solid ${border};"><div style="width:18px;height:18px;border-radius:50%;background:${color};"></div></div>`
	});
}

export default function Map() {
	const [locations, setLocations] = useState<Location[]>([])
	const [category, setCategory] = useState<string>('')
	const [status, setStatus] = useState<string>('unchecked')
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		if (typeof window !== 'undefined') {
			// Загружаем точки и статусы
			const savedReports = JSON.parse(localStorage.getItem('reports') || 'null')
			const savedStatuses = JSON.parse(localStorage.getItem('point_statuses') || '{}')
			const reportsToUse = savedReports || defaultReports.reports

			console.log('Loading data:')
			console.log('savedReports from localStorage:', savedReports)
			console.log('savedStatuses from localStorage:', savedStatuses)
			console.log('defaultReports from JSON:', defaultReports.reports)
			console.log('reportsToUse:', reportsToUse)

			const userLocations = reportsToUse
				.filter((r: any) => r.coords)
				.map((r: any) => {
					console.log('Processing report:', r)
					const location = {
						id: r.id,
						lat: r.coords.lat,
						lng: r.coords.lng,
						title: r.category,
						description: r.description,
						status: savedStatuses[r.id] || r.status || 'unchecked',
						category: r.category,
					}
					console.log('Mapped location:', location)
					return location
				})
			
			console.log('Final locations:', userLocations)
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
		(loc) => {
			const statusMatch = !status || loc.status === status
			const categoryMatch = !category || loc.category === category
			console.log(
				'Filtering:',
				'\nLocation status:', loc.status,
				'\nExpected status:', status,
				'\nStatus match:', statusMatch,
				'\nCategory:', loc.category
			)
			return statusMatch && categoryMatch
		}
	)

	return (
		<div className="h-screen w-full flex flex-col md:flex-row">
			{/* Панель фильтров */}
			<aside className="w-full md:w-64 bg-background shadow-lg z-10 p-4 md:block border-r border-primary/20">
				<h2 className="font-bold text-lg mb-4">Фильтры</h2>
				<div className="mb-4">
					<label className="block mb-1 font-medium text-accent/80">Категория</label>
					<select
						className="w-full border rounded p-2 bg-background text-accent border-primary/20"
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
					<label className="block mb-1 font-medium text-accent/80">Статус</label>
					<select
						className="w-full border rounded p-2 bg-background text-accent border-primary/20"
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
								<div className="bg-background text-accent p-2 rounded border border-primary/20">
									<h3 className="font-bold text-lg mb-1">{location.title}</h3>
									<div className="mb-2 text-sm text-accent/80">Категория: {location.category}</div>
									<div className="mb-2 text-accent">{location.description}</div>
									<div className="text-xs text-accent/60">Статус: {STATUS.find(s => s.value === location.status)?.label}</div>
									<Link href={`/object/${location.id}`} className="text-primary hover:text-primary/80 underline text-sm mt-2 inline-block">Подробнее</Link>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
		</div>
	)
}
