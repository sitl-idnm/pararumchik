"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Report {
	id: string;
	category: string;
	address: string;
	coords?: { lat: number; lng: number };
	description: string;
	anonymous: boolean;
	files: string[];
	createdAt: string;
	status?: string;
}

const STATUS_LABELS = {
	checking: "На проверке",
	open: "Одобрено",
	rejected: "Отклонено"
};

const STATUS_COLORS = {
	checking: "text-primary/50",
	open: "text-accent",
	rejected: "text-primary"
};

function Notification({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 2500);
		return () => clearTimeout(timer);
	}, [onClose]);
	return (
		<div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-accent ${type === 'success' ? 'bg-accent/20' : 'bg-primary'}`}>{message}</div>
	);
}

export default function MyReportsPage() {
	const [reports, setReports] = useState<Report[]>([]);
	const [filter, setFilter] = useState<string>("all");
	const [sort, setSort] = useState<'desc' | 'asc'>('desc');
	const [showConfirm, setShowConfirm] = useState<string | null>(null);
	const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
	const [editId, setEditId] = useState<string | null>(null);
	const [editDescription, setEditDescription] = useState("");

	useEffect(() => {
		// Здесь будет загрузка данных с сервера
		const mockData: Report[] = [
			{
				id: '1',
				category: 'Наркотики',
				description: 'Описание заявки 1',
				status: 'checking',
				address: 'ул. Примерная, д. 1',
				createdAt: '2024-03-10T12:00:00',
				files: ['image1.jpg', 'video1.mp4'],
				anonymous: false
			},
			{
				id: '2',
				category: 'Притоны',
				description: 'Описание заявки 2',
				status: 'open',
				address: 'ул. Тестовая, д. 2',
				createdAt: '2024-03-09T15:30:00',
				files: ['image2.jpg'],
				anonymous: true
			},
			{
				id: '3',
				category: 'Проституция',
				description: 'Описание заявки 3',
				status: 'rejected',
				address: 'ул. Образцовая, д. 3',
				createdAt: '2024-03-08T09:15:00',
				files: [],
				anonymous: false
			},
		];
		setReports(mockData);
	}, []);

	const filteredReports = reports
		.filter(report => filter === "all" || report.status === filter)
		.sort((a, b) => {
			const dateA = new Date(a.createdAt).getTime();
			const dateB = new Date(b.createdAt).getTime();
			return sort === 'desc' ? dateB - dateA : dateA - dateB;
		});

	const handleEdit = async (id: string, newDescription: string) => {
		// Здесь будет отправка на сервер
		const updatedReports = reports.map(report =>
			report.id === id ? { ...report, description: newDescription } : report
		);
		setReports(updatedReports);
		setEditId(null);
		setNotification({ message: "Заявка успешно обновлена", type: "success" });
	};

	const handleDelete = async (id: string) => {
		// Здесь будет отправка на сервер
		setReports(reports.filter(report => report.id !== id));
		setShowConfirm(null);
		setNotification({ message: "Заявка успешно удалена", type: "success" });
	};

	return (
		<div className="max-w-2xl mx-auto mt-12 p-6 bg-background border border-primary/20 rounded shadow relative">
			<h1 className="text-2xl font-bold mb-6">Мои заявки</h1>

			<div className="mb-4 flex flex-col md:flex-row gap-2 md:items-end">
				<div className="flex-1">
					<label className="block mb-2 font-medium">Фильтр по статусу:</label>
					<select
						className="w-full border rounded p-2 bg-background text-accent border-primary/20"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="all">Все заявки</option>
						<option value="checking">На проверке</option>
						<option value="open">Одобренные</option>
						<option value="rejected">Отклоненные</option>
					</select>
				</div>
				<div>
					<label className="block mb-2 font-medium">Сортировка:</label>
					<select
						className="w-full border rounded p-2 bg-background text-accent border-primary/20"
						value={sort}
						onChange={e => setSort(e.target.value as 'desc' | 'asc')}
					>
						<option value="desc">Сначала новые</option>
						<option value="asc">Сначала старые</option>
					</select>
				</div>
			</div>

			{filteredReports.length === 0 ? (
				<div className="text-center py-8 text-accent/60">
					{filter === "all"
						? "У вас пока нет заявок"
						: "Нет заявок с выбранным статусом"}
				</div>
			) : (
				<div className="space-y-4">
					{filteredReports.map(report => (
						<div key={report.id} className="border rounded p-4 bg-background border-primary/20">
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="font-semibold">{report.category}</h3>
									<p className="text-sm text-accent/80">{report.address}</p>
								</div>
								<span className={`text-sm ${STATUS_COLORS[report.status as keyof typeof STATUS_COLORS]}`}>
									{STATUS_LABELS[report.status as keyof typeof STATUS_LABELS]}
								</span>
							</div>
							{editId === report.id ? (
								<div className="mb-2">
									<textarea
										className="w-full border rounded p-2 mb-2 bg-background text-accent border-primary/20"
										value={editDescription}
										onChange={e => setEditDescription(e.target.value)}
										rows={3}
									/>
									<div className="flex gap-2">
										<button
											className="bg-accent/20 text-accent px-3 py-1 rounded hover:bg-accent/30"
											onClick={() => handleEdit(report.id, editDescription)}
										>Сохранить</button>
										<button
											className="bg-primary/20 px-3 py-1 rounded hover:bg-primary/30"
											onClick={() => setEditId(null)}
										>Отмена</button>
									</div>
								</div>
							) : (
								<p className="text-sm mb-2 text-accent/80">{report.description}</p>
							)}
							{report.files && report.files.length > 0 && (
								<div className="mb-2 flex flex-wrap gap-2">
									{report.files.map((file, i) => file.match(/\.(jpg|jpeg|png|gif)$/i)
										? <img key={i} src={file} alt="Вложение" className="w-20 h-20 object-cover rounded" />
										: file.match(/\.(mp4|webm|ogg)$/i)
											? <video key={i} src={file} controls className="w-20 h-20 rounded" />
											: <span key={i} className="text-xs text-accent/60">{file}</span>
									)}
								</div>
							)}
							<div className="flex justify-between items-center text-xs text-accent/60">
								<span>{new Date(report.createdAt).toLocaleString()}</span>
								<div className="flex gap-2">
									<Link
										href={`/object/${report.id}`}
										className="text-primary hover:text-primary/80"
									>
										Подробнее
									</Link>
									{report.status === 'checking' && editId !== report.id && (
										<button
											className="text-primary/50 hover:text-primary/80"
											onClick={() => {
												setEditId(report.id);
												setEditDescription(report.description);
											}}
										>Редактировать</button>
									)}
									<button
										className="text-primary hover:text-primary/80"
										onClick={() => setShowConfirm(report.id)}
									>Удалить</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{showConfirm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-background p-6 rounded shadow-lg max-w-sm w-full mx-4 border border-primary/20">
						<h3 className="text-lg font-semibold mb-4">Подтверждение удаления</h3>
						<p className="text-accent/80 mb-6">Вы уверены, что хотите удалить эту заявку?</p>
						<div className="flex justify-end gap-4">
							<button
								className="px-4 py-2 bg-primary/20 rounded hover:bg-primary/30 text-accent"
								onClick={() => setShowConfirm(null)}
							>
								Отмена
							</button>
							<button
								className="px-4 py-2 bg-primary text-accent rounded hover:bg-primary/80"
								onClick={() => handleDelete(showConfirm)}
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			)}

			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
		</div>
	)
}
