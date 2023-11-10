import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from '@/__mocks__'
import { UserActivityModel, UserModel } from '@/models'
import {
	TUserAverageSession as TUserAvgSession,
	TUserPerformance,
} from '@/types'

export class ProfileService {
	static async getUserMainData(userId: number): Promise<UserModel> {
		const userIndex = USER_MAIN_DATA.findIndex((data) => data.id === userId)

		if (userIndex === -1) throw new Error(`${userId} not found`)

		return UserModel.createUser(USER_MAIN_DATA[userIndex])
	}

	static async getUserActivity(userId: number): Promise<UserActivityModel> {
		const userActivityIndex = USER_ACTIVITY.findIndex(
			(data) => data.userId === userId
		)

		if (userActivityIndex === -1) throw new Error(`${userId} not found`)

		return UserActivityModel.createUserActivity(
			USER_ACTIVITY[userActivityIndex]
		)
	}

	static async getUserAverageSessions(
		userId: number
	): Promise<TUserAvgSession> {
		const userAvgSessionsIndex = USER_AVERAGE_SESSIONS.findIndex(
			(data) => data.userId === userId
		)

		if (userAvgSessionsIndex === -1) throw new Error(`${userId} not found`)

		const userAvgSessions = USER_AVERAGE_SESSIONS[userAvgSessionsIndex]

		return userAvgSessions
	}

	static async getUserPerformance(userId: number): Promise<TUserPerformance> {
		const userPerfIndex = USER_PERFORMANCE.findIndex(
			(data) => data.userId === userId
		)

		if (userPerfIndex === -1) throw new Error(`${userId} not found`)

		const userPerformance = USER_PERFORMANCE[userPerfIndex]

		return userPerformance
	}
}
