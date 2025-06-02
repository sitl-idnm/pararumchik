"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import defaultReports from '@/data/reports.json';

interface Report {
	id: string;
	category: string;
	coords?: { lat: number; lng: number };
	description: string;
	createdAt: string;
	status?: string;
}

interface ReportUpdate {
	additionalInfo: string;
	confirmationDetails: string;
	contactInfo?: string;
	timestamp: string;
}

export default function ObjectPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [report, setReport] = useState<Report | null>(null);
	const [updates, setUpdates] = useState<ReportUpdate[]>([]);

	useEffect(() => {
		// Получаем статусы из localStorage
		const savedStatuses = JSON.parse(localStorage.getItem("point_statuses") || "{}");
		
		// Получаем обновления из localStorage
		const savedUpdates = JSON.parse(localStorage.getItem("report_updates") || "{}");
		const pointUpdates = savedUpdates[id] || [];
		setUpdates(pointUpdates);
		
		// Ищем точку в JSON данных
		const found = defaultReports.reports.find((r: Report) => r.id === id);
		
		if (found) {
			// Применяем сохраненный статус, если есть
			const reportWithStatus = {
				...found,
				status: savedStatuses[found.id] || found.status || 'unchecked'
			};
			setReport(reportWithStatus);
		} else {
			setReport(null);
		}
	}, [id]);

	if (!report) {
		return <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">Объект не найден.</div>;
	}

	return (
		<div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">
			<button onClick={() => router.back()} className="mb-4 text-blue-400 hover:text-blue-300">← Назад</button>
			
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">{report.category}</h1>
				{report.coords && (
					<div className="mb-2 text-gray-400">
						Координаты: {report.coords.lat}, {report.coords.lng}
					</div>
				)}
				<div className="mb-2 text-gray-200">{report.description}</div>
				<div className="text-xs text-gray-500 mb-2">{new Date(report.createdAt).toLocaleString()}</div>
				<div className="mb-2">Статус: <span className={
					report.status === 'open' ? 'text-green-400' :
						report.status === 'rejected' ? 'text-red-400' :
							report.status === 'unchecked' ? 'text-yellow-400' :
								'text-yellow-400'
				}>
					{report.status === 'open' ? 'Открыто' : 
					report.status === 'rejected' ? 'Отклонено' : 
					report.status === 'unchecked' ? 'Не проверен' : 
					'На модерации'}
				</span></div>
			</div>

			{updates.length > 0 && (
				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-3">Обновления информации</h2>
					<div className="space-y-4">
						{updates.map((update, index) => (
							<div key={index} className="bg-gray-700 p-4 rounded">
								<div className="mb-2">
									<span className="text-gray-400">Дополнительная информация:</span>
									<div className="mt-1">{update.additionalInfo}</div>
								</div>
								<div className="mb-2">
									<span className="text-gray-400">Подтверждение:</span>
									<div className="mt-1">{update.confirmationDetails}</div>
								</div>
								{update.contactInfo && (
									<div className="mb-2">
										<span className="text-gray-400">Контакт:</span>
										<div className="mt-1">{update.contactInfo}</div>
									</div>
								)}
								<div className="text-xs text-gray-500">
									{new Date(update.timestamp).toLocaleString()}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="flex gap-3">
				<button 
					onClick={() => router.push(`/object/${id}/update`)}
					className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
				>
					Дополнить информацию
				</button>
				<button 
					onClick={() => router.push('/moderation')}
					className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
				>
					Модерация
				</button>
			</div>
		</div>
	);
}
