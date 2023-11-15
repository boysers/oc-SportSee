type ProfileHeaderProps = { firstName: string }

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ firstName }) => {
	return (
		<div className="ProfilePage__header">
			<h1 className="ProfilePage__header__title">
				Bonjour <span>{firstName}</span>
			</h1>
			<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
		</div>
	)
}
