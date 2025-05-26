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
	checking: "text-yellow-400",
	open: "text-green-400",
	rejected: "text-red-400"
};

function Notification({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 2500);
		return () => clearTimeout(timer);
	}, [onClose]);
	return (
		<div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{message}</div>
	);
}

export default function MyReportsPage() {
	const [reports, setReports] = useState<Report[]>([]);
	const [filter, setFilter] = useState<string>("all");
	const [sort, setSort] = useState<'desc' | 'asc'>('desc');
	const [editId, setEditId] = useState<string | null>(null);
	const [editDescription, setEditDescription] = useState<string>("");
	const [showConfirm, setShowConfirm] = useState<string | null>(null);
	const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

	// Автообновление статусов
	useEffect(() => {
		const interval = setInterval(() => {
			const data = JSON.parse(localStorage.getItem("reports") || "[]");
			setReports(data);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("reports") || "[]");
		setReports(data);
	}, []);

	const filteredReports = reports
		.filter(report => {
			if (filter === "all") return true;
			return report.status === filter;
		})
		.sort((a, b) => sort === 'desc'
			? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			: new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);

	function handleDelete(id: string) {
		const updated = reports.filter(r => r.id !== id);
		setReports(updated);
		localStorage.setItem("reports", JSON.stringify(updated));
		setShowConfirm(null);
		setNotification({ message: 'Заявка удалена', type: 'success' });
	}

	function handleEdit(id: string, description: string) {
		const updated = reports.map(r => r.id === id ? { ...r, description } : r);
		setReports(updated);
		localStorage.setItem("reports", JSON.stringify(updated));
		setEditId(null);
		setNotification({ message: 'Описание обновлено', type: 'success' });
	}

	return (
		<div className="max-w-2xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow relative text-white">
			<h1 className="text-2xl font-bold mb-6">Мои заявки</h1>

			<div className="mb-4 flex flex-col md:flex-row gap-2 md:items-end">
				<div className="flex-1">
					<label className="block mb-2 font-medium">Фильтр по статусу:</label>
					<select
						className="w-full border rounded p-2 bg-gray-700 text-white border-gray-600"
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
						className="w-full border rounded p-2 bg-gray-700 text-white border-gray-600"
						value={sort}
						onChange={e => setSort(e.target.value as 'desc' | 'asc')}
					>
						<option value="desc">Сначала новые</option>
						<option value="asc">Сначала старые</option>
					</select>
				</div>
			</div>

			{filteredReports.length === 0 ? (
				<div className="text-center py-8 text-gray-400">
					{filter === "all"
						? "У вас пока нет заявок"
						: "Нет заявок с выбранным статусом"}
				</div>
			) : (
				<div className="space-y-4">
					{filteredReports.map(report => (
						<div key={report.id} className="border rounded p-4 bg-gray-700 border-gray-600">
							<div className="flex justify-between items-start mb-2">
								<div>
									<h3 className="font-semibold">{report.category}</h3>
									<p className="text-sm text-gray-400">{report.address}</p>
								</div>
								<span className={`text-sm ${STATUS_COLORS[report.status as keyof typeof STATUS_COLORS]}`}>
									{STATUS_LABELS[report.status as keyof typeof STATUS_LABELS]}
								</span>
							</div>
							{editId === report.id ? (
								<div className="mb-2">
									<textarea
										className="w-full border rounded p-2 mb-2 bg-gray-600 text-white border-gray-500"
										value={editDescription}
										onChange={e => setEditDescription(e.target.value)}
										rows={3}
									/>
									<div className="flex gap-2">
										<button
											className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
											onClick={() => handleEdit(report.id, editDescription)}
										>Сохранить</button>
										<button
											className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500"
											onClick={() => setEditId(null)}
										>Отмена</button>
									</div>
								</div>
							) : (
								<p className="text-sm mb-2 text-gray-300">{report.description}</p>
							)}
							{report.files && report.files.length > 0 && (
								<div className="mb-2 flex flex-wrap gap-2">
									{report.files.map((file, i) => file.match(/\.(jpg|jpeg|png|gif)$/i)
										? <img key={i} src={file} alt="Вложение" className="w-20 h-20 object-cover rounded" />
										: file.match(/\.(mp4|webm|ogg)$/i)
											? <video key={i} src={file} controls className="w-20 h-20 rounded" />
											: <span key={i} className="text-xs text-gray-400">{file}</span>
									)}
								</div>
							)}
							<div className="flex justify-between items-center text-xs text-gray-400">
								<span>{new Date(report.createdAt).toLocaleString()}</span>
								<div className="flex gap-2">
									<Link
										href={`/object/${report.id}`}
										className="text-blue-400 hover:text-blue-300"
									>
										Подробнее
									</Link>
									{report.status === 'checking' && editId !== report.id && (
										<button
											className="text-yellow-400 hover:text-yellow-300"
											onClick={() => {
												setEditId(report.id);
												setEditDescription(report.description);
											}}
										>Редактировать</button>
									)}
									<button
										className="text-red-400 hover:text-red-300"
										onClick={() => setShowConfirm(report.id)}
									>Удалить</button>
								</div>
							</div>
							{showConfirm === report.id && (
								<div className="mt-2 bg-gray-600 border border-gray-500 rounded p-2 flex flex-col gap-2">
									<span>Удалить заявку безвозвратно?</span>
									<div className="flex gap-2">
										<button
											className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
											onClick={() => handleDelete(report.id)}
										>Удалить</button>
										<button
											className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-400"
											onClick={() => setShowConfirm(null)}
										>Отмена</button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			{notification && (
				<Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
			)}
		</div>
	);
}
