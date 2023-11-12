import { USER_ID_DEFAULT } from '@/utils/constants'
import { UserActivityModel, UserModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { LoaderFunction } from 'react-router-dom'
import { TProfileLoader } from '@/pages/Profile/routes/ProfileLoader.type'

export const profileLoader: LoaderFunction<
	TProfileLoader
> = async () => {
	const {
		getUserMainData,
		getUserActivity,
		getUserAverageSessions,
		getUserPerformance,
	} = UserService

	const user = await getUserMainData(USER_ID_DEFAULT)
	const userMainData = UserModel.createUser(user)
	const userId = userMainData.userId

	const [activity, sessionsAvg, performance] = await Promise.all([
		getUserActivity(userId),
		getUserAverageSessions(userId),
		getUserPerformance(userId),
	])

	const userActivity = UserActivityModel.createUserActivity(
		activity,
		sessionsAvg
	)

	const userPerformance =
		UserPerformanceModel.createUserPerformance(performance)

	return {
		userMainData,
		userActivity,
		userPerformance,
	}
}
