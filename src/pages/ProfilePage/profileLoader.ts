import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { USER_ID_DEFAULT } from '@/utils/constants'
import { LoaderFunction } from 'react-router-dom'

export type FetchProfileResults = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profileLoader: LoaderFunction<FetchProfileResults> = async (props) => {
	const params = new URL(props.request.url).searchParams

	props.request.signal

	const id = params.get('id')

	const userId = !id ? USER_ID_DEFAULT : Number(id)

	if (isNaN(userId)) {
		throw new Error('id is not a number')
	}

	const userService = new UserService({ userId, signal: props.request.signal })

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

export const fetchProfile: (signal?: AbortSignal | null) => Promise<FetchProfileResults> = async (
	signal
) => {
	const id = new URL(document.location.href).searchParams.get('id')
	const userId = !id ? USER_ID_DEFAULT : Number(id)

	if (isNaN(userId)) {
		throw new Error('id is not a number')
	}

	const userService = new UserService({ userId, signal })

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
