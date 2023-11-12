import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { BASE_DOCUMENT_TITLE, PAGE_TITLES } from '@/utils/constants'

export const RootLayout: React.FC = () => {
	const location = useLocation()
	useEffect(() => {
		const title = PAGE_TITLES[location.pathname]
		document.title = title
			? `${title} - ${BASE_DOCUMENT_TITLE}`
			: BASE_DOCUMENT_TITLE
	}, [location])
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}
