import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { USER_ID_DEFAULT } from '@/utils/constants'
import { LoaderFunction } from 'react-router-dom'

export type TProfileLoader = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profileLoader: LoaderFunction<TProfileLoader> = async (props) => {
	const params = new URL(props.request.url).searchParams

	const id = params.get('id')

	const userId = !id ? USER_ID_DEFAULT : Number(id)

	if (isNaN(userId)) {
		throw new Error('id is not a number')
	}

	const userService = new UserService({ userId })

	const user = await userService.getUserInfo()

	if (user instanceof Error) throw user

	const [dailyActivity, durationSessions, performance] = await Promise.all([
		userService.getUserDailyActivity(),
		userService.getUserDurationSessions(),
		userService.getUserPerformance(),
	])

	const userInfo = UserInfoModel.createUserInfo(user)

	const userActivity = UserActivityModel.createUserActivity(dailyActivity, durationSessions)

	const userPerformance = UserPerformanceModel.createUserPerformance(performance)

	return { userInfo, userActivity, userPerformance }
}
