import { TUser } from '@/types'

export class User {
	static createUser(userData: TUser) {
		return new User(userData)
	}

	private cachedAvgScore: number | undefined
	private cachedAvgScorePercentage: string | undefined

	private constructor(private readonly userData: TUser) {}

	private scoreFactory() {
		if (!this.cachedAvgScore) {
			const baseScore =
				('score' in this.userData
					? this.userData.score
					: this.userData.todayScore) ?? 0
			this.cachedAvgScore = baseScore
		}
		return this.cachedAvgScore
	}

	private calculateAvgScorePercentage() {
		if (!this.cachedAvgScorePercentage) {
			const avgScore = this.scoreFactory()
			this.cachedAvgScorePercentage = `${Math.floor(avgScore * 100)}%`
		}
		return this.cachedAvgScorePercentage
	}

	get userId() {
		return this.userData.id
	}

	get avgScorePercentage() {
		return this.calculateAvgScorePercentage()
	}

	get avgScore() {
		return this.scoreFactory()
	}

	get userInfos() {
		return this.userData.userInfos
	}

	get keyData() {
		return this.userData.keyData
	}
}
