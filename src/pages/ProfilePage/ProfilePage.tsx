import {
	DailyActivityBarChart,
	AverageScoreRadialBarChart,
	DurationSessionsLineChart,
	ActivityTypeRadarChart,
} from '@/components/chart'
import { ProfileKeyInfoCardList, ProfileHeader } from './components'
import { fetchProfile } from './profileLoader'
import { useFetch } from '@/utils/hooks'

export const ProfilePage: React.FC = () => {
	const { data } = useFetch(fetchProfile)

	if (!data) return null

	const { userActivity, userInfo, userPerformance } = data

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
