import { TUser } from '@/utils/types/User.type'

export class UserModel {
	static createUser(userData: TUser) {
		return new UserModel(userData)
	}

	private cachedAvgScore: number | undefined

	private constructor(private readonly userData: TUser) {}

	private scoreFactory() {
		if (!this.cachedAvgScore) {
			const baseScore =
				('score' in this.userData ? this.userData.score : this.userData.todayScore) ?? 0
			this.cachedAvgScore = baseScore
		}
		return this.cachedAvgScore
	}

	get userId() {
		return this.userData.id
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
