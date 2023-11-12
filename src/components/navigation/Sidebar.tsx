import { AltersIcon, BikeIcon, SwimmingIcon, YogaIcon } from '../icon'

export const Sidebar: React.FC = () => {
	const copyright = `Copyright, SportSee 2023`
	return (
		<aside className="Sidebar" data-copyright={copyright}>
			<ul>
				<YogaIcon />
				<SwimmingIcon />
				<BikeIcon />
				<AltersIcon />
			</ul>
		</aside>
	)
}
