import { PropsWithChildren } from 'react'

type SidebarProps = PropsWithChildren

const Navbar: React.FC = () => {
	return (
		<div>
			<ul>
				<li>Icon 1</li>
				<li>Icon 2</li>
				<li>Icon 3</li>
				<li>Icon 4</li>
			</ul>

			<footer>Copiryght, SportSee {new Date().getFullYear()}</footer>
		</div>
	)
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	)
}
