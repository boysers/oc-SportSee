import { USER_ID_DEFAULT } from '@/constants'
import { UserActivityModel, UserModel, UserPerformanceModel } from '@/models'
import { ProfileService } from '@/services'
import { LoaderFunction } from 'react-router-dom'

export type TProfilePageLoader = {
	userMainData: UserModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profilePageLoader: LoaderFunction<
	TProfilePageLoader
> = async () => {
	const {
		getUserMainData,
		getUserActivity,
		getUserAverageSessions,
		getUserPerformance,
	} = ProfileService

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
