"use client";
import { useEffect, useState } from "react";

interface Report {
	id: string;
	category: string;
	address: string;
	coords?: { lat: number; lng: number };
	description: string;
	anonymous: boolean;
	files: string[];
	createdAt: string;
	status?: string; // 'checking' | 'open' | 'rejected' | 'unchecked'
}

export default function ModerationPage() {
	const [reports, setReports] = useState<Report[]>([]);
	const [statuses, setStatuses] = useState<Record<string, string>>({});

	useEffect(() => {
		// Загружаем исходные точки из JSON
		const data = JSON.parse(localStorage.getItem("reports") || "[]");
		// Загружаем сохраненные статусы
		const savedStatuses = JSON.parse(localStorage.getItem("point_statuses") || "{}");
		setStatuses(savedStatuses);
		
		// Применяем сохраненные статусы к точкам
		const reportsWithStatuses = data.map(r => ({
			...r,
			status: savedStatuses[r.id] || r.status || 'unchecked'
		}));
		setReports(reportsWithStatuses);
	}, []);

	function updateStatus(id: string, status: string) {
		// Обновляем статус в отдельном хранилище
		const newStatuses = { ...statuses, [id]: status };
		setStatuses(newStatuses);
		localStorage.setItem("point_statuses", JSON.stringify(newStatuses));

		// Обновляем состояние компонента
		const updated = reports.map(r => r.id === id ? { ...r, status } : r);
		setReports(updated);
	}

	return (
		<div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">
			<h1 className="text-2xl font-bold mb-6">Модерация заявок</h1>
			{reports.length === 0 && <div className="text-gray-400">Нет заявок.</div>}
			<ul className="space-y-4">
				{reports.map(r => (
					<li key={r.id} className="border border-gray-600 rounded p-4 bg-gray-700">
						<div className="font-semibold mb-1">Категория: {r.category}</div>
						<div className="text-sm text-gray-400 mb-1">Адрес/координаты: {r.address}</div>
						<div className="mb-1 text-gray-200">{r.description}</div>
						<div className="text-xs text-gray-500 mb-2">{new Date(r.createdAt).toLocaleString()}</div>
						<div className="flex gap-2 items-center mb-2">
							<span className="text-xs">Статус:</span>
							<span className={
								r.status === 'open' ? 'text-green-400' :
									r.status === 'rejected' ? 'text-red-400' :
										r.status === 'unchecked' ? 'text-yellow-400' :
											'text-yellow-400'
							}>
								{r.status === 'open' ? 'Открыто' : 
								 r.status === 'rejected' ? 'Отклонено' : 
								 r.status === 'unchecked' ? 'Не проверен' : 
								 'На модерации'}
							</span>
						</div>
						{r.status !== 'open' && (
							<button
								className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
								onClick={() => updateStatus(r.id, 'open')}
							>Принять</button>
						)}
						{r.status !== 'rejected' && (
							<button
								className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
								onClick={() => updateStatus(r.id, 'rejected')}
							>Отклонить</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
