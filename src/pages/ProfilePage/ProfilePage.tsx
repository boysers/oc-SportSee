import {
	DailyActivityBarChart,
	AverageScoreRadialBarChart,
	DurationSessionsLineChart,
	ActivityTypeRadarChart,
} from '@/components/chart'
import { useLoaderData } from 'react-router-dom'
import { ProfileKeyInfoCardList, ProfileHeader } from './components'
import { TProfileLoader } from './profileLoader'

export const ProfilePage: React.FC = () => {
	const { userActivity, userInfo, userPerformance } = useLoaderData() as TProfileLoader

	const { firstName, averageScore, keyInfo } = userInfo
	const { durationSessions, sessions, caloriesDomain, kilogramDomain } = userActivity

	return (
		<div className="ProfilePage">
			<ProfileHeader firstName={firstName} />
			<div className="ProfilePage__container">
				<div className="ProfilePage__container__charts">
					<DailyActivityBarChart
						sessions={sessions}
						caloriesDomain={caloriesDomain}
						kilogramDomain={kilogramDomain}
					/>
					<div className="ProfilePage__container__charts__stats">
						<DurationSessionsLineChart durationSessions={durationSessions} />
						<ActivityTypeRadarChart activities={userPerformance.data} />
						<AverageScoreRadialBarChart averageScore={averageScore} />
					</div>
				</div>
				<ProfileKeyInfoCardList keyInfo={keyInfo} />
			</div>
		</div>
	)
}
