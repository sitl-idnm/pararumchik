import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'Тёмная Москва',
	description: 'Общественный цифровой проект по выявлению и мониторингу опасных мест',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ru" className="bg-gray-900">
			<body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>{children}</body>
		</html>
	)
}
