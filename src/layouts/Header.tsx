import { Link } from 'react-router-dom'
import sportSeeLogo from '@/assets/sportsee_logo.svg'
import { PAGE_PATH_NAMES } from '../constants'

const Navbar: React.FC = () => {
	return (
		<ul className="Navbar">
			<li>
				<Link to={PAGE_PATH_NAMES['home']}>Accueil</Link>
			</li>
			<li>
				<Link to={PAGE_PATH_NAMES['profile']}>Profil</Link>
			</li>
			<li>
				<Link to={PAGE_PATH_NAMES['settings']}>Réglages</Link>
			</li>
			<li>
				<Link to={PAGE_PATH_NAMES['community']}>Communauté</Link>
			</li>
		</ul>
	)
}

export const Header: React.FC = () => {
	return (
		<div className="Header">
			<Link to={PAGE_PATH_NAMES['home']}>
				<img src={sportSeeLogo} alt="SportSee logo" />
			</Link>
			<Navbar />
		</div>
	)
}
