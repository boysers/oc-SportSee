import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './SideBar'

export const RootLayout: React.FC = () => {
	return (
		<>
			<Header />
			<Sidebar>
				<Outlet />
			</Sidebar>
		</>
	)
}
