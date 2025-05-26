"use client";
import { useParams, useRouter } from "next/navigation";
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
	status?: string;
}

export default function ObjectPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const [report, setReport] = useState<Report | null>(null);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("reports") || "[]");
		const found = data.find((r: Report) => r.id === id);
		setReport(found || null);
	}, [id]);

	if (!report) {
		return <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">Объект не найден.</div>;
	}

	return (
		<div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">
			<button onClick={() => router.back()} className="mb-4 text-blue-400 hover:text-blue-300">← Назад</button>
			<h1 className="text-2xl font-bold mb-2">{report.category}</h1>
			<div className="mb-2 text-gray-400">{report.address}</div>
			<div className="mb-2 text-gray-200">{report.description}</div>
			<div className="text-xs text-gray-500 mb-2">{new Date(report.createdAt).toLocaleString()}</div>
			<div className="mb-2">Статус: <span className={
				report.status === 'open' ? 'text-green-400' :
					report.status === 'rejected' ? 'text-red-400' :
						'text-yellow-400'}>
				{report.status === 'open' ? 'Открыто' : report.status === 'rejected' ? 'Отклонено' : 'На модерации'}
			</span></div>
			{report.files && report.files.length > 0 && (
				<div className="mb-2">
					<div className="font-medium mb-1">Вложения:</div>
					<ul className="list-disc pl-5">
						{report.files.map((f, i) => (
							<li key={i} className="text-gray-300">{f}</li>
						))}
					</ul>
				</div>
			)}
			<button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-700">Сообщить обновление</button>
		</div>
	);
}
