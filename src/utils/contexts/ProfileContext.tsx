import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { createContext, PropsWithChildren, useState, useEffect } from 'react'
import { USER_ID_DEFAULT } from '../constants'

type TProfileContext = { data: TData | null }

type TData = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const ProfileContext = createContext<TProfileContext | null>({ data: null })

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [data, setData] = useState<TData | null>(null)
	const [error, setError] = useState<Error | null>(null)

	// https://fr.react.dev/reference/react/useEffect#fetching-data-with-effects
	useEffect(() => {
		let ignore = false

		const fetchData = async () => {
			try {
				const id = new URL(document.location.href).searchParams.get('id')

				const userId = !id ? USER_ID_DEFAULT : Number(id)

				if (isNaN(userId)) {
					throw new Error('id is not a number')
				}

				const userService = new UserService({ userId })

				const user = await userService.getUserInfo()

				const [dailyActivity, durationSessions, performance] = await Promise.all([
					userService.getUserDailyActivity(),
					userService.getUserDurationSessions(),
					userService.getUserPerformance(),
				])

				const userInfo = UserInfoModel.createUserInfo(user)
				const userActivity = UserActivityModel.createUserActivity(
					dailyActivity,
					durationSessions
				)
				const userPerformance = UserPerformanceModel.createUserPerformance(performance)

				setData({ userInfo, userActivity, userPerformance })
			} catch (error) {
				if (error instanceof Error) {
					setError(error)
				}
			}
		}

		if (!ignore) {
			fetchData()
		}

		return () => {
			ignore = true
		}
	}, [])

	if (error instanceof Error) throw error

	return <ProfileContext.Provider value={{ data }}>{children}</ProfileContext.Provider>
}
