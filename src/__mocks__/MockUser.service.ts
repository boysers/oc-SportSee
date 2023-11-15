import {
	TUser,
	TUserActivity,
	TUserAverageSession,
	TUserPerformance,
} from '@/utils/types/User.type'
import { MOCKED_USER_INFO } from './mocked-user-info'
import { MOCKED_USER_DAILY_ACTIVITY } from './mocked-user-daily-activity'
import { MOCKED_USER_DURATION_SESSIONS } from './mocked-user-duration-sessions'
import { MOCKED_USER_PERFORMANCE } from './mocked-user-performance'
import { USER_ID_DEFAULT } from '@/utils/constants'

export class MockUserService {
	private userId

	constructor({ userId }: { userId: typeof USER_ID_DEFAULT }) {
		this.userId = userId
	}

	async getUserInfo(): Promise<TUser> {
		const userIndex = MOCKED_USER_INFO.findIndex((data) => data.id === this.userId)
		if (userIndex === -1) throw new Error(`${this.userId} not found`)
		return MOCKED_USER_INFO[userIndex]
	}

	async getUserDailyActivity(): Promise<TUserActivity> {
		const userActivityIndex = MOCKED_USER_DAILY_ACTIVITY.findIndex(
			(data) => data.userId === this.userId
		)
		if (userActivityIndex === -1) throw new Error(`${this.userId} not found`)
		return MOCKED_USER_DAILY_ACTIVITY[userActivityIndex]
	}

	async getUserDurationSessions(): Promise<TUserAverageSession> {
		const userAvgSessionsIndex = MOCKED_USER_DURATION_SESSIONS.findIndex(
			(data) => data.userId === this.userId
		)
		if (userAvgSessionsIndex === -1) throw new Error(`${this.userId} not found`)
		return MOCKED_USER_DURATION_SESSIONS[userAvgSessionsIndex]
	}

	async getUserPerformance(): Promise<TUserPerformance> {
		const userPerfIndex = MOCKED_USER_PERFORMANCE.findIndex(
			(data) => data.userId === this.userId
		)
		if (userPerfIndex === -1) throw new Error(`${this.userId} not found`)
		return MOCKED_USER_PERFORMANCE[userPerfIndex]
	}
}
