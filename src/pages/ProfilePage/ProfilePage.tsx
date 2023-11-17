import {
	DailyActivityBarChart,
	AverageScoreRadialBarChart,
	DurationSessionsLineChart,
	ActivityTypeRadarChart,
} from '@/components/chart'
import { useLoaderData } from '@/utils/hooks'
import { ProfileHeader, ProfileKeyInfoCardList } from '@/components/profile'
import { ProfileLoaderResults } from './profileLoader'

export const ProfilePage: React.FC = () => {
	const loaderData = useLoaderData<ProfileLoaderResults>()

	if (!loaderData) return null

	const { userInfo, userActivity, userPerformance } = loaderData

	const { firstName, averageScore, keyInfo } = userInfo
	const { sessions, caloriesDomain, kilogramDomain } = userActivity
	const performanceData = userPerformance.data

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
						<DurationSessionsLineChart durationSessions={sessions} />
						<ActivityTypeRadarChart activities={performanceData} />
						<AverageScoreRadialBarChart averageScore={averageScore} />
					</div>
				</div>
				<ProfileKeyInfoCardList keyInfo={keyInfo} />
			</div>
		</div>
	)
}
