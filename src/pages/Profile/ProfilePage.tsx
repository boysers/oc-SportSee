import {
	UserActivityBarChart,
	UserAvgScoreRadialBarChart,
	UserAvgSessionsLineChart,
	UserPerformanceRadarChart,
} from '@/components/chart'
import { useRouteLoaderData } from 'react-router-dom'
import { ProfileCardInfoList, ProfileHeader } from './components'
import { TProfileLoader } from './routes'

export const ProfilePage: React.FC = () => {
	const { userMainData, userActivity, userPerformance } = useRouteLoaderData(
		'user-profile'
	) as TProfileLoader
	const { keyData, userInfos, avgScore } = userMainData
	return (
		<div className="ProfilePage">
			<ProfileHeader firstName={userInfos.firstName} />
			<div className="ProfilePage__container">
				<div className="ProfilePage__container__charts">
					<UserActivityBarChart userActivity={userActivity} />
					<div className="ProfilePage__container__charts__stats">
						<UserAvgSessionsLineChart userActivity={userActivity} />
						<UserPerformanceRadarChart userPerformance={userPerformance} />
						<UserAvgScoreRadialBarChart avgScore={avgScore} />
					</div>
				</div>
				<ProfileCardInfoList keyData={keyData} />
			</div>
		</div>
	)
}
