import { ResponseError } from '@/utils/helpers'
import {
	TUser,
	TUserActivity,
	TUserAverageSession,
	TUserPerformance,
} from '@/utils/types/User.type'

export class UserService {
	private api
	private signal

	constructor({ userId, signal }: { userId: number; signal?: AbortSignal | null }) {
		this.api = `http://localhost:3000/user/${userId}/`
		this.signal = signal
	}

	async getUserInfo(): Promise<TUser> {
		const res = await fetch(this.api, { signal: this.signal })

		if (!res.ok) {
			const errorMessage = await res.json()
			throw new ResponseError(res.status, errorMessage)
		}

		const { data } = await res.json()
		return data
	}

	async getUserDailyActivity(): Promise<TUserActivity> {
		const res = await fetch(this.api + 'activity')
		const { data } = await res.json()
		return data
	}

	async getUserDurationSessions(): Promise<TUserAverageSession> {
		const res = await fetch(this.api + 'average-sessions')
		const { data } = await res.json()
		return data
	}

	async getUserPerformance(): Promise<TUserPerformance> {
		const res = await fetch(this.api + 'performance')
		const { data } = await res.json()
		return data
	}
}
