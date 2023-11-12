import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BASE_DOCUMENT_TITLE, DOCUMENT_TITLES } from '@/utils/constants'
import { Header } from '../navigation'

export const RootLayout: React.FC = () => {
	const location = useLocation()
	useEffect(() => {
		const title = DOCUMENT_TITLES[location.pathname]
		document.title = title ? `${title} - ${BASE_DOCUMENT_TITLE}` : BASE_DOCUMENT_TITLE
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
