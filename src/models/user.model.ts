import { TUser } from '@/types'

export class User {
	static createUser(userData: TUser) {
		return new User(userData)
	}

	private cachedTodayScore: number | undefined

	private constructor(private readonly userData: TUser) {}

	private todayScoreFactory() {
		if (!this.cachedTodayScore) {
			const baseScore =
				('score' in this.userData
					? this.userData.score
					: this.userData.todayScore) ?? 0

			const calculatedScore = Math.floor(baseScore * 100)

			this.cachedTodayScore = calculatedScore
		}
		return this.cachedTodayScore
	}

	get id() {
		return this.userData.id
	}

	get todayScore() {
		return this.todayScoreFactory()
	}

	get userInfos() {
		return this.userData.userInfos
	}

	get keyData() {
		return this.userData.keyData
	}
}
