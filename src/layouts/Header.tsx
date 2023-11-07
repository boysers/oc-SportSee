import { Link } from 'react-router-dom'
import sportSeeLogo from '@/assets/sportsee_logo.svg'
import { PAGES_PATHS } from '../constants'

const Navbar: React.FC = () => {
	return (
		<ul className="Navbar">
			<li>
				<Link to={PAGES_PATHS['home']}>Accueil</Link>
			</li>
			<li>
				<Link to={PAGES_PATHS['profile']}>Profil</Link>
			</li>
			<li>
				<Link to={PAGES_PATHS['settings']}>Réglages</Link>
			</li>
			<li>
				<Link to={PAGES_PATHS['community']}>Communauté</Link>
			</li>
		</ul>
	)
}

export const Header: React.FC = () => {
	return (
		<div className="Header">
			<Link to={PAGES_PATHS['home']}>
				<img src={sportSeeLogo} alt="SportSee logo" />
			</Link>
			<Navbar />
		</div>
	)
}
