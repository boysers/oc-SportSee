import { PATH_NAMES } from '@/utils/constants'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<ul className="Navbar">
			<li>
				<Link to={PATH_NAMES.home}>Accueil</Link>
			</li>
			<li>
				<Link to={PATH_NAMES.profile}>Profil</Link>
			</li>
			<li>
				<Link to={PATH_NAMES.settings}>Réglages</Link>
			</li>
			<li>
				<Link to={PATH_NAMES.community}>Communauté</Link>
			</li>
		</ul>
	)
}

export const Header: React.FC = () => {
	return (
		<div className="Header">
			<Link to={PATH_NAMES.home}>
				<img src="/images/logo/sportsee_logo.svg" alt="SportSee logo" />
			</Link>
			<Navbar />
		</div>
	)
}
