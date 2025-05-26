import Link from 'next/link'

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen text-white">
			<header className="mb-12 text-center">
				<h1 className="text-4xl font-bold mb-4">Тёмная Москва</h1>
				<p className="text-xl text-gray-400">
					Общественный цифровой проект по выявлению и мониторингу опасных мест
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Link href="/map" className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-700">
					<h2 className="text-2xl font-semibold mb-2">Интерактивная карта</h2>
					<p className="text-gray-400">Просмотр и фильтрация опасных мест на карте Москвы</p>
				</Link>

				<Link href="/report" className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-700">
					<h2 className="text-2xl font-semibold mb-2">Сообщить о месте</h2>
					<p className="text-gray-400">Подать заявку на проверку опасного места</p>
				</Link>

				<Link href="/my-reports" className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-700">
					<h2 className="text-2xl font-semibold mb-2">Мои заявки</h2>
					<p className="text-gray-400">Просмотр статуса и истории ваших заявок</p>
				</Link>

				<Link href="/moderation" className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-gray-700">
					<h2 className="text-2xl font-semibold mb-2">Модерация</h2>
					<p className="text-gray-400">Проверка и принятие заявок</p>
				</Link>
			</div>
		</div>
	)
}
