// Скрипт для добавления новых точек на карту

const newReports = [
  {
    id: '1713225601',
    coords: { lat: 55.721914, lng: 37.653936 },
    category: 'притоны',
    description: 'Evolve Gym',
    status: 'checking'
  },
  {
    id: '1713225602',
    coords: { lat: 55.721853, lng: 37.654709 },
    category: 'притоны',
    description: 'Старлит плюс',
    status: 'checking'
  },
  {
    id: '1713225603',
    coords: { lat: 55.718562, lng: 37.647908 },
    category: 'притоны',
    description: 'Хостел Порт',
    status: 'checking'
  },
  {
    id: '1713225604',
    coords: { lat: 55.718567, lng: 37.646875 },
    category: 'притоны',
    description: 'Sv hostel',
    status: 'checking'
  },
  {
    id: '1713225605',
    coords: { lat: 55.718567, lng: 37.646875 },
    category: 'притоны',
    description: 'Уютный дом',
    status: 'checking'
  },
  {
    id: '1713225606',
    coords: { lat: 55.724636, lng: 37.650217 },
    category: 'притоны',
    description: 'Urapov-dom.com',
    status: 'checking'
  },
  {
    id: '1713225607',
    coords: { lat: 55.721138, lng: 37.647720 },
    category: 'притоны',
    description: 'Просто',
    status: 'checking'
  },
  {
    id: '1713225608',
    coords: { lat: 55.716397, lng: 37.644737 },
    category: 'притоны',
    description: 'Спектра',
    status: 'checking'
  },
  {
    id: '1713225609',
    coords: { lat: 55.716017, lng: 37.646444 },
    category: 'притоны',
    description: 'Без названия',
    status: 'checking'
  },
  {
    id: '1713225610',
    coords: { lat: 55.726000, lng: 37.640000 },
    category: 'притоны',
    description: 'Заходи',
    status: 'checking'
  },
  {
    id: '1713225611',
    coords: { lat: 55.716500, lng: 37.645000 },
    category: 'притоны',
    description: 'Памир Альянс',
    status: 'checking'
  }
];

// Получаем текущие отчеты из localStorage
const currentReports = JSON.parse(localStorage.getItem('reports') || '[]');

// Объединяем текущие и новые отчеты
const updatedReports = [...currentReports, ...newReports];

// Сохраняем обновленный массив в localStorage
localStorage.setItem('reports', JSON.stringify(updatedReports));

console.log('Точки успешно добавлены в localStorage'); 