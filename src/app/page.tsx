"use client";

import Link from 'next/link'
import dynamic from 'next/dynamic'

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
	ssr: false,
	loading: () => (
		<div className="w-full h-full bg-background animate-pulse"></div>
	),
});

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-12">
			<div className="grid md:grid-cols-2 gap-8 items-center mb-16 max-w-[1440px] mx-auto">
				<div className="flex flex-col space-y-8 md:pr-8 lg:pr-12">
					<div className="space-y-4 min-w-[320px] text-center md:text-left">
						<h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white">ИЛЛЮЗИЯ ПОРЯДКА</h1>
						<div className="space-y-2">
							<p className="text-xl md:text-2xl text-primary">За фасадом города — реальность, о которой молчат</p>
							<p className="text-lg md:text-xl text-accent/80">Сообщите о местах, где порядок — лишь видимость</p>
						</div>
					</div>
					<div className="flex justify-center md:justify-start">
						<Link 
							href="/report" 
							className="w-fit bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-xl font-medium transition-colors"
						>
							СООБЩИТЬ О МЕСТЕ
						</Link>
					</div>
					
					<div className="grid grid-cols-1 gap-4 mt-8 max-w-xl">
						<div className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-background/50">
							<div className="text-2xl">
								<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
							<p className="text-accent/80">Каждый сигнал — вклад в разоблачение городской иллюзии.</p>
						</div>

						<div className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-background/50">
							<div className="text-2xl">
								<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 11V9M11 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
							<p className="text-accent/80">Карта отображает реальность, скрытую за системой.</p>
						</div>

						<div className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-background/50">
							<div className="text-2xl">
								<svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4H8C5.79086 4 4 5.79086 4 8Z" stroke="currentColor" strokeWidth="2"/>
									<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
									<path d="M10 12L14 12M12 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</div>
							<p className="text-accent/80">Анонимность гарантирована. Проверка на достоверность — обязательна.</p>
						</div>
					</div>
				</div>
				
				<Link href="/map" className="block">
					<div className="relative aspect-[4/3] bg-background/80 rounded-lg overflow-hidden group transition-all hover:scale-[1.02] duration-300">
						<div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10"></div>
						<div className="absolute inset-0">
							<MapPreview />
							<div className="absolute z-20 top-6 right-6 space-y-2">
								<div className="flex items-center justify-end space-x-2">
									<div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
									<span className="text-sm font-medium text-white bg-black/70 px-3 py-1.5 rounded">АКТИВНАЯ</span>
								</div>
								<div className="flex items-center justify-end space-x-2">
									<div className="w-3 h-3 rounded-full bg-[#3939cc] animate-pulse"></div>
									<span className="text-sm font-medium text-white bg-black/70 px-3 py-1.5 rounded">НА ПРОВЕРКЕ</span>
								</div>
								<div className="flex items-center justify-end space-x-2">
									<div className="w-3 h-3 rounded-full bg-[#1a8f12]"></div>
									<span className="text-sm font-medium text-white bg-black/70 px-3 py-1.5 rounded">ЗАКРЫТА</span>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>

			{/* Статистика */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
				<div className="bg-background border border-primary/20 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-primary mb-2">150+</div>
					<div className="text-accent/80">Выявленных мест</div>
				</div>
				<div className="bg-background border border-primary/20 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-primary mb-2">50+</div>
					<div className="text-accent/80">Закрытых объектов</div>
				</div>
				<div className="bg-background border border-primary/20 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-primary mb-2">1000+</div>
					<div className="text-accent/80">Активных участников</div>
				</div>
			</div>

			{/* Основные разделы */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
				<Link href="/map" className="group">
					<div className="p-6 bg-background border border-primary/20 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-primary h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
							Интерактивная карта
						</div>
						<p className="text-accent/80">
							Просмотр и фильтрация опасных мест на карте Москвы. Отслеживайте статус объектов и их историю.
						</p>
					</div>
				</Link>

				<Link href="/report" className="group">
					<div className="p-6 bg-background border border-primary/20 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-primary h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
							Сообщить о месте
						</div>
						<p className="text-accent/80">
							Подайте заявку на проверку опасного места. Анонимно или от своего имени.
						</p>
					</div>
				</Link>

				<Link href="/my-reports" className="group">
					<div className="p-6 bg-background border border-primary/20 rounded-lg shadow-md hover:shadow-lg transition-all hover:border-primary h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
							Мои заявки
						</div>
						<p className="text-accent/80">
							Отслеживайте статус и историю ваших заявок. Получайте уведомления об обновлениях.
						</p>
					</div>
				</Link>
			</div>

			{/* Как это работает */}
			<div className="bg-background border border-primary/20 rounded-lg p-8 mb-16">
				<h2 className="text-2xl font-bold mb-6 text-center">Как это работает</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="text-3xl font-bold text-primary mb-2">1</div>
						<h3 className="font-semibold mb-2">Сообщите</h3>
						<p className="text-accent/80">Заполните форму с информацией о месте</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-primary mb-2">2</div>
						<h3 className="font-semibold mb-2">Проверка</h3>
						<p className="text-accent/80">Модерация в течение 48 часов</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-primary mb-2">3</div>
						<h3 className="font-semibold mb-2">Передача</h3>
						<p className="text-accent/80">Подача в правоохранительные органы</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-primary mb-2">4</div>
						<h3 className="font-semibold mb-2">Результат</h3>
						<p className="text-accent/80">Публикация итогов проверки</p>
					</div>
				</div>
			</div>

			{/* Призыв к действию */}
			<div className="text-center">
				<h2 className="text-2xl font-bold mb-4">Помогите сделать город безопаснее</h2>
				<p className="text-accent/80 mb-6">
					Присоединяйтесь к проекту и помогайте выявлять опасные места в вашем районе
				</p>
				<Link
					href="/report"
					className="inline-block bg-primary hover:bg-primary/80 text-accent font-semibold py-3 px-8 rounded-lg transition-colors"
				>
					Сообщить о месте
				</Link>
			</div>
		</div>
	)
}
