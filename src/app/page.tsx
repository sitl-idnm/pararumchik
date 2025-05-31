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
			<div className="grid md:grid-cols-2 gap-8 items-center mb-16">
				<div className="space-y-6">
					<h1 className="text-5xl font-bold text-white">ТЁМНАЯ<br />МОСКВА</h1>
					<p className="text-2xl text-primary">СООБЩИТЕ<br />О ПОДОЗРИ-<br />ТЕЛЬНЫХ<br />МЕСТАХ</p>
					<Link 
						href="/report" 
						className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-xl font-medium transition-colors"
					>
						СООБЩИТЬ О МЕСТЕ
					</Link>
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
									<div className="w-3 h-3 rounded-full bg-[#4444ff] animate-pulse"></div>
									<span className="text-sm font-medium text-white bg-black/70 px-3 py-1.5 rounded">НА ПРОВЕРКЕ</span>
								</div>
								<div className="flex items-center justify-end space-x-2">
									<div className="w-3 h-3 rounded-full bg-[#22d515]"></div>
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
