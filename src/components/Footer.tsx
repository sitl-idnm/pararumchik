import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="w-full bg-background border-t border-primary/20 mt-auto mt-10">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">О проекте</h3>
						<p className="text-accent/80">
							Общественный цифровой проект по выявлению и мониторингу опасных мест в Москве
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Навигация</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/map" className="text-accent/80 hover:text-primary transition-colors">
									Интерактивная карта
								</Link>
							</li>
							<li>
								<Link href="/report" className="text-accent/80 hover:text-primary transition-colors">
									Сообщить о месте
								</Link>
							</li>
							<li>
								<Link href="/my-reports" className="text-accent/80 hover:text-primary transition-colors">
									Мои заявки
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Контакты</h3>
						<p className="text-accent/80">
							Для связи используйте форму подачи заявки
						</p>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-primary/20 text-center text-accent/60">
					<p>© 2025 Тёмная Москва. Все права защищены.</p>
				</div>
			</div>
		</footer>
	)
}
