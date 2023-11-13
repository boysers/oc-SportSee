import { USER_ID_DEFAULT } from '@/utils/constants'
import { USER_DAILY_ACTIVITY, USER_DURATION_SESSIONS, USER_INFO, USER_PERFORMANCE } from '.'
import {
	TUser,
	TUserActivity,
	TUserAverageSession,
	TUserPerformance,
} from '@/utils/types/User.type'

export class MockUserService {
	private userId

	constructor({ userId }: { userId: typeof USER_ID_DEFAULT }) {
		this.userId = userId
	}

	async getUserInfo(): Promise<TUser> {
		const userIndex = USER_INFO.findIndex((data) => data.id === this.userId)
		if (userIndex === -1) throw new Error(`${this.userId} not found`)
		return USER_INFO[userIndex]
	}

	async getUserDailyActivity(): Promise<TUserActivity> {
		const userActivityIndex = USER_DAILY_ACTIVITY.findIndex(
			(data) => data.userId === this.userId
		)
		if (userActivityIndex === -1) throw new Error(`${this.userId} not found`)
		return USER_DAILY_ACTIVITY[userActivityIndex]
	}

	async getUserDurationSessions(): Promise<TUserAverageSession> {
		const userAvgSessionsIndex = USER_DURATION_SESSIONS.findIndex(
			(data) => data.userId === this.userId
		)
		if (userAvgSessionsIndex === -1) throw new Error(`${this.userId} not found`)
		return USER_DURATION_SESSIONS[userAvgSessionsIndex]
	}

	async getUserPerformance(): Promise<TUserPerformance> {
		const userPerfIndex = USER_PERFORMANCE.findIndex((data) => data.userId === this.userId)
		if (userPerfIndex === -1) throw new Error(`${this.userId} not found`)
		return USER_PERFORMANCE[userPerfIndex]
	}
}
