import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
	ssr: false,
	loading: () => (
		<div className="h-screen w-full flex items-center justify-center bg-gray-900">
			<p className="text-xl text-white">Загрузка карты...</p>
		</div>
	),
})

export default function MapPage() {
	return <Map />
}
