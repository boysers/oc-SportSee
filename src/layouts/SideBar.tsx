import { AltersIcon, BikeIcon, SwimmingIcon, YogaIcon } from '@/components/Icon'
import { PropsWithChildren } from 'react'

type SidebarProps = PropsWithChildren

const Navbar: React.FC = () => {
	return (
		<aside
			className="Sidebar__Navbar"
			data-copyright={`Copiryght, SportSee ${new Date().getFullYear()}`}
		>
			<ul>
				<YogaIcon />
				<SwimmingIcon />
				<BikeIcon />
				<AltersIcon />
			</ul>
		</aside>
	)
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
	return (
		<div className="Sidebar">
			<Navbar />
			<main className="Sidebar__main">
				<div>{children}</div>
			</main>
		</div>
	)
}
