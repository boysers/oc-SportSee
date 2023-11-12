import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const ProfileLayout: React.FC = () => <Sidebar children={<Outlet />} />
