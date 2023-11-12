import { TUser } from '@/utils/types/User.type'

type KeyInfo = {
	calorieCount: string
	proteinCount: string
	carbohydrateCount: string
	lipidCount: string
}

export class UserModel {
	static createUser(userData: TUser) {
		return new UserModel(userData)
	}

	private cachedAverageScore: number | undefined
	private cachedKeyInfo: KeyInfo | undefined

	private constructor(private readonly userData: TUser) {}

	private scoreFactory() {
		if (!this.cachedAverageScore) {
			const baseScore =
				('score' in this.userData ? this.userData.score : this.userData.todayScore) ?? 0
			this.cachedAverageScore = baseScore
		}
		return this.cachedAverageScore
	}

	private calculateKeyInfos(): KeyInfo {
		if (!this.cachedKeyInfo) {
			const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
				this.userData.keyData
			const keyInfos: KeyInfo = {
				calorieCount: `${calorieCount}kCal`,
				proteinCount: `${proteinCount}kg`,
				carbohydrateCount: `${carbohydrateCount}kg`,
				lipidCount: `${lipidCount}kg`,
			}
			this.cachedKeyInfo = keyInfos
		}
		return this.cachedKeyInfo
	}

	get userId() {
		return this.userData.id
	}

	get averageScore() {
		return this.scoreFactory()
	}

	get firstName() {
		return this.userData.userInfos.firstName
	}

	get keyInfo() {
		return this.calculateKeyInfos()
	}
}
