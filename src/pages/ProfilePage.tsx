import { UserActivityBarChart } from '@/components/Chart'
import { ProfilePageLoader } from '@/types'
import { useLoaderData } from 'react-router-dom'

type HeaderProps = { firstName: string }

const Header: React.FC<HeaderProps> = ({ firstName }) => {
	return (
		<div className="ProfilePage__header">
			<h1 className="ProfilePage__header__title">
				Bonjour <span>{firstName}</span>
			</h1>
			<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
		</div>
	)
}

export const ProfilePage: React.FC = () => {
	const { userMainData, userActivity } = useLoaderData() as ProfilePageLoader
	const { userInfos } = userMainData
	return (
		<div className="ProfilePage">
			<Header firstName={userInfos.firstName} />
			<div className="ProfilePage__container">
				<UserActivityBarChart userActivity={userActivity} />
			</div>
		</div>
	)
}
