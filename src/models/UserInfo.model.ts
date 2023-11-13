import { TUser } from '@/utils/types/User.type'

type KeyInfo = {
	calorieCount: string
	proteinCount: string
	carbohydrateCount: string
	lipidCount: string
}

type AverageScore = number

export class UserInfoModel {
	static createUserInfo(userInfoData: TUser) {
		return new UserInfoModel(userInfoData)
	}

	private cachedAverageScore: AverageScore | undefined

	private cachedKeyInfo: KeyInfo | undefined

	private constructor(private readonly userData: TUser) {}

	private buildScoreAverageFactory(): AverageScore {
		if (!this.cachedAverageScore) {
			const baseScore =
				('score' in this.userData ? this.userData.score : this.userData.todayScore) ?? 0
			this.cachedAverageScore = baseScore
		}
		return this.cachedAverageScore
	}

	private formatKeyInfo(): KeyInfo {
		if (!this.cachedKeyInfo) {
			const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
				this.userData.keyData
			const keyInfo: KeyInfo = {
				calorieCount: `${calorieCount}kCal`,
				proteinCount: `${proteinCount}kg`,
				carbohydrateCount: `${carbohydrateCount}kg`,
				lipidCount: `${lipidCount}kg`,
			}
			this.cachedKeyInfo = keyInfo
		}
		return this.cachedKeyInfo
	}

	get averageScore(): AverageScore {
		return this.buildScoreAverageFactory()
	}

	get keyInfo(): KeyInfo {
		return this.formatKeyInfo()
	}

	get firstName(): string {
		return this.userData.userInfos.firstName
	}
}
