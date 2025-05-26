import Link from 'next/link'

export default function Header() {
	return (
		<header className="w-full bg-gray-800 border-b border-gray-700">
			<div className="container mx-auto px-4 py-4">
				<nav className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition-colors">
						<span className="inline-block w-7 h-7">
							{/* SVG-логотип: стилизованный силуэт города */}
							<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="2" y="18" width="4" height="10" rx="1" fill="#60A5FA" />
								<rect x="8" y="12" width="6" height="16" rx="1" fill="#3B82F6" />
								<rect x="16" y="8" width="6" height="20" rx="1" fill="#1E40AF" />
								<rect x="24" y="16" width="6" height="12" rx="1" fill="#0EA5E9" />
							</svg>
						</span>
						Тёмная Москва
					</Link>

					<div className="flex items-center space-x-6">
						<Link href="/map" className="text-gray-300 hover:text-white transition-colors">
							Карта
						</Link>
						<Link href="/report" className="text-gray-300 hover:text-white transition-colors">
							Сообщить
						</Link>
						<Link href="/my-reports" className="text-gray-300 hover:text-white transition-colors">
							Мои заявки
						</Link>
						<Link href="/moderation" className="text-gray-300 hover:text-white transition-colors">
							Модерация
						</Link>
					</div>
				</nav>
			</div>
		</header>
	)
}
