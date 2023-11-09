import { AltersIcon, BikeIcon, SwimmingIcon, YogaIcon } from '@/components/Icon'
import { PropsWithChildren } from 'react'

type NavbarProps = { className?: string }

type SidebarProps = PropsWithChildren

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
	const copyright = `Copyright, SportSee ${new Date().getFullYear()}`
	return (
		<aside className={className} data-copyright={copyright}>
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
		<div className="ProfileLayout">
			<Navbar className="ProfileLayout__Sidebar" />
			<div className="ProfileLayout__container">
				<div>{children}</div>
			</div>
		</div>
	)
}
