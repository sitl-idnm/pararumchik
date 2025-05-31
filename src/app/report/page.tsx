"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const MapPicker = dynamic(() => import('@/components/MapPicker.client'), {
	ssr: false,
	loading: () => (
		<div className="h-[250px] w-full bg-gray-50 rounded-lg flex items-center justify-center">
			<p>Загрузка карты...</p>
		</div>
	)
});

const CATEGORIES = [
	"наркотики",
	"притоны",
	"проституция",
	"нелегальные бары",
];

export default function ReportPage() {
	const [category, setCategory] = useState("");
	const [address, setAddress] = useState("");
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
	const [description, setDescription] = useState("");
	const [files, setFiles] = useState<FileList | null>(null);
	const [anonymous, setAnonymous] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			setFiles(e.target.files);
		}
	}

	function handleMapPick(lat: number, lng: number) {
		setCoords({ lat, lng });
		setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		if (!category || !description || !address) {
			setError("Заполните все обязательные поля");
			return;
		}

		// Здесь будет отправка на сервер
		const formData = new FormData();
		formData.append('category', category);
		formData.append('description', description);
		formData.append('address', address);
		formData.append('anonymous', String(anonymous));

		if (files) {
			Array.from(files).forEach(file => {
				formData.append('files', file);
			});
		}

		try {
			// Имитация отправки
			await new Promise(resolve => setTimeout(resolve, 1000));
			router.push('/my-reports');
		} catch (err) {
			setError("Произошла ошибка при отправке заявки");
		}
	};

	if (submitted) {
		return (
			<div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow text-center">
				<h2 className="text-2xl font-bold mb-4">Спасибо!</h2>
				<p>Ваша заявка отправлена на модерацию. Мы свяжемся с вами при необходимости.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
			<div className="max-w-xl w-full mt-12 p-6 bg-gray-800 rounded shadow text-white">
				<h1 className="text-2xl font-bold mb-6">Сообщить о месте</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="mb-4">
						<label className="block mb-1 font-medium">Выберите место на карте (кликните):</label>
						<div className="w-full h-[250px] rounded-lg overflow-hidden">
							<MapPicker onPick={handleMapPick} />
						</div>
						{coords && (
							<div className="text-xs text-gray-500 mt-1">Выбрано: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}</div>
						)}
					</div>

					<div>
						<label className="block mb-1 font-medium text-accent/80">Категория*</label>
						<select
							className="w-full border rounded p-2 bg-gray-700 text-accent border-primary/20"
							value={category}
							onChange={e => setCategory(e.target.value)}
							required
						>
							<option value="">Выберите категорию</option>
							{CATEGORIES.map(cat => (
								<option key={cat} value={cat}>{cat}</option>
							))}
						</select>
					</div>
					<div>
						<label className="block mb-1 font-medium text-accent/80">Адрес*</label>
						<input
							type="text"
							className="w-full border rounded p-2 bg-gray-700 text-accent border-primary/20"
							value={address}
							onChange={e => setAddress(e.target.value)}
							placeholder="Укажите точный адрес"
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-accent/80">Описание*</label>
						<textarea
							className="w-full border rounded p-2 bg-gray-700 text-accent border-primary/20"
							value={description}
							onChange={e => setDescription(e.target.value)}
							rows={4}
							placeholder="Опишите проблему, детали, время и т.д."
							required
						/>
					</div>
					<div>
						<label className="block mb-1 font-medium text-accent/80">Вложения (фото/видео, не обязательно)</label>
						<input
							type="file"
							multiple
							accept="image/*,video/*"
							onChange={handleFileChange}
							className="w-full text-accent bg-gray-700 border border-primary/20 rounded p-2 file:bg-primary/20 file:text-accent file:border-0"
						/>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="anon"
							checked={anonymous}
							onChange={e => setAnonymous(e.target.checked)}
							className="accent-primary"
						/>
						<label htmlFor="anon" className="text-sm text-accent/80">Отправить анонимно</label>
					</div>
					{error && <div className="text-primary text-sm">{error}</div>}
					<button
						type="submit"
						className="w-full bg-primary text-accent py-2 rounded font-semibold hover:bg-primary/80 transition"
					>
						Отправить заявку
					</button>
				</form>
			</div>
		</div>
	);
}
