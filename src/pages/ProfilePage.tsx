import { UserModel } from '@/models'
import { useLoaderData } from 'react-router-dom'

export const ProfilePage: React.FC = () => {
	const { userInfos } = useLoaderData() as UserModel

	return (
		<div className="ProfilePage">
			<div className="ProfilePage__header">
				<h1 className="ProfilePage__header__title">
					Bonjour <span>{userInfos.firstName}</span>
				</h1>

				<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
			</div>

			<div className="ProfilePage__container"></div>
		</div>
	)
}
