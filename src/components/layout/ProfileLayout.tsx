import { Outlet } from 'react-router-dom'
import { Sidebar } from '../navigation'

export const ProfileLayout: React.FC = () => {
	return (
		<div className="ProfileLayout">
			<Sidebar />
			<div className="ProfileLayout__container">
				<Outlet />
			</div>
		</div>
	)
}
