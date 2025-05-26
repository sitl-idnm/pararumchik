import Link from 'next/link'

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-12">
			{/* Hero секция */}
			<div className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-6">Тёмная Москва</h1>
				<p className="text-xl text-gray-400 max-w-2xl mx-auto">
					Общественный цифровой проект по выявлению и мониторингу опасных мест в Москве.
					Помогаем сделать город безопаснее вместе.
				</p>
			</div>

			{/* Статистика */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
				<div className="bg-gray-800 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
					<div className="text-gray-400">Выявленных мест</div>
				</div>
				<div className="bg-gray-800 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-green-400 mb-2">50+</div>
					<div className="text-gray-400">Закрытых объектов</div>
				</div>
				<div className="bg-gray-800 p-6 rounded-lg text-center">
					<div className="text-3xl font-bold text-purple-400 mb-2">1000+</div>
					<div className="text-gray-400">Активных участников</div>
				</div>
			</div>

			{/* Основные разделы */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
				<Link href="/map" className="group">
					<div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
							Интерактивная карта
						</div>
						<p className="text-gray-400">
							Просмотр и фильтрация опасных мест на карте Москвы. Отслеживайте статус объектов и их историю.
						</p>
					</div>
				</Link>

				<Link href="/report" className="group">
					<div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
							Сообщить о месте
						</div>
						<p className="text-gray-400">
							Подайте заявку на проверку опасного места. Анонимно или от своего имени.
						</p>
					</div>
				</Link>

				<Link href="/my-reports" className="group">
					<div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-700 h-full">
						<div className="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
							Мои заявки
						</div>
						<p className="text-gray-400">
							Отслеживайте статус и историю ваших заявок. Получайте уведомления об обновлениях.
						</p>
					</div>
				</Link>
			</div>

			{/* Как это работает */}
			<div className="bg-gray-800 rounded-lg p-8 mb-16">
				<h2 className="text-2xl font-bold mb-6 text-center">Как это работает</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">1</div>
						<h3 className="font-semibold mb-2">Сообщите</h3>
						<p className="text-gray-400">Заполните форму с информацией о месте</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">2</div>
						<h3 className="font-semibold mb-2">Проверка</h3>
						<p className="text-gray-400">Модерация в течение 48 часов</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">3</div>
						<h3 className="font-semibold mb-2">Передача</h3>
						<p className="text-gray-400">Подача в правоохранительные органы</p>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">4</div>
						<h3 className="font-semibold mb-2">Результат</h3>
						<p className="text-gray-400">Публикация итогов проверки</p>
					</div>
				</div>
			</div>

			{/* Призыв к действию */}
			<div className="text-center">
				<h2 className="text-2xl font-bold mb-4">Помогите сделать город безопаснее</h2>
				<p className="text-gray-400 mb-6">
					Присоединяйтесь к проекту и помогайте выявлять опасные места в вашем районе
				</p>
				<Link
					href="/report"
					className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
				>
					Сообщить о месте
				</Link>
			</div>
		</div>
	)
}
