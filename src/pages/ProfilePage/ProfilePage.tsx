import {
	DailyActivityBarChart,
	AverageScoreRadialBarChart,
	DurationSessionsLineChart,
	ActivityTypeRadarChart,
} from '@/components/chart'
import { useFetch } from '@/utils/hooks'
import { ProfileHeader, ProfileKeyInfoCardList } from '@/components/profile'
import { profileFetch } from './profileFetch'

export const ProfilePage: React.FC = () => {
	const { data, error } = useFetch(profileFetch)

	if (error) throw error

	if (!data) return null

	const { userActivity, userInfo, userPerformance } = data

	const { firstName, averageScore, keyInfo } = userInfo
	const { sessions, caloriesDomain, kilogramDomain } = userActivity

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
						<ActivityTypeRadarChart activities={userPerformance.data} />
						<AverageScoreRadialBarChart averageScore={averageScore} />
					</div>
				</div>
				<ProfileKeyInfoCardList keyInfo={keyInfo} />
			</div>
		</div>
	)
}
