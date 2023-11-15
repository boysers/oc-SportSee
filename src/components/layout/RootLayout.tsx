import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BASE_DOCUMENT_TITLE, DOCUMENT_TITLES, PATH_NAMES } from '@/utils/constants'
import { Header } from '../navigation'

export const RootLayout: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		const title = DOCUMENT_TITLES[location.pathname]
		document.title = title ? `${title} - ${BASE_DOCUMENT_TITLE}` : BASE_DOCUMENT_TITLE
	}, [location])

	useEffect(() => {
		if (location.pathname === PATH_NAMES.home) {
			navigate(PATH_NAMES.profile)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}
