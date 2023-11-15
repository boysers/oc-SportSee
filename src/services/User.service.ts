import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { ResponseError } from '@/utils/helpers'
import {
	TUser,
	TUserActivity,
	TUserAverageSession,
	TUserPerformance,
} from '@/utils/types/User.type'

export type GetProfileResults = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export class UserService {
	private api
	private signal

	constructor({ userId, signal }: { userId: number; signal?: AbortSignal | null }) {
		this.api = `http://localhost:3000/user/${userId}/`
		this.signal = signal
	}

	private async getUserInfo(): Promise<TUser> {
		const res = await fetch(this.api, { signal: this.signal })

		if (!res.ok) {
			const errorMessage = await res.json()
			throw new ResponseError(res.status, errorMessage)
		}

		const { data } = await res.json()
		return data
	}

	private async getUserDailyActivity(): Promise<TUserActivity> {
		const res = await fetch(this.api + 'activity')
		const { data } = await res.json()
		return data
	}

	private async getUserDurationSessions(): Promise<TUserAverageSession> {
		const res = await fetch(this.api + 'average-sessions')
		const { data } = await res.json()
		return data
	}

	private async getUserPerformance(): Promise<TUserPerformance> {
		const res = await fetch(this.api + 'performance')
		const { data } = await res.json()
		return data
	}

	async getProfile(): Promise<GetProfileResults> {
		const user = await this.getUserInfo()

		if (user instanceof Error) throw user

		const [dailyActivity, durationSessions, performance] = await Promise.all([
			this.getUserDailyActivity(),
			this.getUserDurationSessions(),
			this.getUserPerformance(),
		])

		const userInfo = UserInfoModel.createUserInfo(user)

		const userActivity = UserActivityModel.createUserActivity(dailyActivity, durationSessions)

		const userPerformance = UserPerformanceModel.createUserPerformance(performance)

		return { userInfo, userActivity, userPerformance }
	}
}
