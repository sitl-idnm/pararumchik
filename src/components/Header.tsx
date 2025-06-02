import Link from 'next/link'

export default function Header() {
	return (
		<header className="w-full bg-background border-b border-primary/20">
			<div className="container mx-auto px-4 py-4">
				<nav className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3 text-xl font-bold hover:text-primary transition-colors">
						<span className="inline-block w-8 h-8 md:w-10 md:h-10">
							<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								{/* Геометка */}
								<path d="M20 40C24 36 36 24.4183 36 16C36 7.58172 28.8366 0 20 0C11.1634 0 4 7.58172 4 16C4 24.4183 16 36 20 40Z" fill="#d22515"/>
								{/* Пиксельный глобус внутри */}
								<g transform="translate(12, 8)">
									<rect x="0" y="4" width="4" height="4" fill="white" fillOpacity="0.9"/>
									<rect x="4" y="0" width="4" height="4" fill="white" fillOpacity="0.7"/>
									<rect x="8" y="4" width="4" height="4" fill="white" fillOpacity="0.5"/>
									<rect x="12" y="8" width="4" height="4" fill="white" fillOpacity="0.3"/>
									<rect x="4" y="8" width="4" height="4" fill="white" fillOpacity="0.8"/>
									<rect x="8" y="12" width="4" height="4" fill="white" fillOpacity="0.4"/>
									<rect x="0" y="12" width="4" height="4" fill="white" fillOpacity="0.6"/>
								</g>
							</svg>
						</span>
						<span className="text-lg md:text-xl whitespace-nowrap">ИЛЛЮЗИЯ ПОРЯДКА</span>
					</Link>

					<div className="flex items-center space-x-4 md:space-x-6">
						<Link href="/map" className="text-accent hover:text-primary transition-colors">
							Карта
						</Link>
						<Link href="/report" className="text-accent hover:text-primary transition-colors">
							Сообщить
						</Link>
						<Link href="/my-reports" className="text-accent hover:text-primary transition-colors">
							Мои заявки
						</Link>
						<Link href="/moderation" className="text-accent hover:text-primary transition-colors">
							Модерация
						</Link>
					</div>
				</nav>
			</div>
		</header>
	)
}
