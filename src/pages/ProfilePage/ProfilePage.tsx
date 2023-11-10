import {
	UserActivityBarChart,
	UserAvgSessionsLineChart,
	UserPerformanceRadarChart,
} from '@/components/Chart'
import { useRouteLoaderData } from 'react-router-dom'
import { TProfilePageLoader } from './loader'

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
	const { userMainData, userActivity, userPerformance } = useRouteLoaderData(
		'user-profile'
	) as TProfilePageLoader
	const { userInfos } = userMainData
	return (
		<div className="ProfilePage">
			<Header firstName={userInfos.firstName} />
			<div className="ProfilePage__container">
				<UserActivityBarChart userActivity={userActivity} />
				<div className="ProfilePage__container__chartStats">
					<UserAvgSessionsLineChart userActivity={userActivity} />
					<UserPerformanceRadarChart
						userPerformance={userPerformance}
					/>
				</div>
			</div>
		</div>
	)
}
