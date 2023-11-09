import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const RootLayout: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}
