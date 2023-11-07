import { Link } from 'react-router-dom'
import sportSeeLogo from '@/assets/sportsee_logo.svg'
import { PAGES_PATHS } from '../constants'

const Navbar: React.FC = () => {
	return (
		<ul>
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
		<div>
			<img src={sportSeeLogo} alt="SportSee logo" />
			<Navbar />
		</div>
	)
}
