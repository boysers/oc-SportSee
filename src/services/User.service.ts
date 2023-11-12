import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '@/__mocks__'
import {
	TUser,
	TUserActivity,
	TUserAverageSession as TUserAvgSession,
	TUserPerformance,
} from '@/utils/types/User.type'

export class UserService {
	static async getUserMainData(userId: number): Promise<TUser> {
		const userIndex = USER_MAIN_DATA.findIndex((data) => data.id === userId)
		if (userIndex === -1) throw new Error(`${userId} not found`)
		return USER_MAIN_DATA[userIndex]
	}

	static async getUserActivity(userId: number): Promise<TUserActivity> {
		const userActivityIndex = USER_ACTIVITY.findIndex((data) => data.userId === userId)
		if (userActivityIndex === -1) throw new Error(`${userId} not found`)
		return USER_ACTIVITY[userActivityIndex]
	}

	static async getUserAverageSessions(userId: number): Promise<TUserAvgSession> {
		const userAvgSessionsIndex = USER_AVERAGE_SESSIONS.findIndex(
			(data) => data.userId === userId
		)
		if (userAvgSessionsIndex === -1) throw new Error(`${userId} not found`)
		return USER_AVERAGE_SESSIONS[userAvgSessionsIndex]
	}

	static async getUserPerformance(userId: number): Promise<TUserPerformance> {
		const userPerfIndex = USER_PERFORMANCE.findIndex((data) => data.userId === userId)
		if (userPerfIndex === -1) throw new Error(`${userId} not found`)
		return USER_PERFORMANCE[userPerfIndex]
	}
}
