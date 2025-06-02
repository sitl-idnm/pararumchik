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

interface UpdateForm {
  additionalInfo: string;
  confirmationDetails: string;
  contactInfo?: string;
}

export default function UpdateReportPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [form, setForm] = useState<UpdateForm>({
    additionalInfo: '',
    confirmationDetails: '',
    contactInfo: ''
  });

  useEffect(() => {
    const savedStatuses = JSON.parse(localStorage.getItem("point_statuses") || "{}");
    const found = defaultReports.reports.find((r: Report) => r.id === id);
    
    if (found) {
      const reportWithStatus = {
        ...found,
        status: savedStatuses[found.id] || found.status || 'unchecked'
      };
      setReport(reportWithStatus);
    } else {
      setReport(null);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Получаем текущие обновления из localStorage
    const updates = JSON.parse(localStorage.getItem("report_updates") || "{}");
    
    // Добавляем новое обновление для этой точки
    const pointUpdates = updates[id] || [];
    pointUpdates.push({
      ...form,
      timestamp: new Date().toISOString()
    });
    
    // Сохраняем обновленные данные
    updates[id] = pointUpdates;
    localStorage.setItem("report_updates", JSON.stringify(updates));
    
    // Возвращаемся на страницу точки
    router.push(`/object/${id}`);
  };

  if (!report) {
    return <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">Объект не найден.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-gray-800 rounded shadow text-white">
      <button onClick={() => router.back()} className="mb-4 text-blue-400 hover:text-blue-300">← Назад</button>
      
      <h1 className="text-2xl font-bold mb-4">Дополнить информацию</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Текущие данные:</h2>
        <div className="bg-gray-700 p-4 rounded">
          <div className="mb-2"><span className="text-gray-400">Категория:</span> {report.category}</div>
          <div className="mb-2"><span className="text-gray-400">Описание:</span> {report.description}</div>
          {report.coords && (
            <div className="mb-2">
              <span className="text-gray-400">Координаты:</span> {report.coords.lat}, {report.coords.lng}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Дополнительная информация</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            rows={4}
            value={form.additionalInfo}
            onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
            placeholder="Опишите новые детали или изменения..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Подтверждение информации</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            rows={2}
            value={form.confirmationDetails}
            onChange={(e) => setForm({ ...form, confirmationDetails: e.target.value })}
            placeholder="Как вы подтверждаете эту информацию? (личное наблюдение, фото, видео и т.д.)"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Контактная информация (необязательно)
          </label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            value={form.contactInfo}
            onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
            placeholder="Как с вами связаться при необходимости"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Отправить дополнение
        </button>
      </form>
    </div>
  );
} 