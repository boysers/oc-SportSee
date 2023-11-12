import { TUserPerformance } from '@/types'
import { translateKind } from '@/utils/helpers'

type TPerformanceItem = {
	name: string
	value: number
}

export class UserPerformance {
	static createUserPerformance(userPerformanceData: TUserPerformance) {
		return new UserPerformance(userPerformanceData)
	}

	private cachedPerformanceData: Array<TPerformanceItem> | undefined

	private constructor(
		private readonly userPerformanceData: TUserPerformance
	) {}

	private calculatePerformanceData() {
		if (!this.cachedPerformanceData) {
			const { data, kind: kindList } = this.userPerformanceData
			this.cachedPerformanceData = data.map(({ kind, value }) => ({
				name: translateKind(kindList[kind]),
				value,
			}))
		}
		return this.cachedPerformanceData
	}

	get data(): Array<TPerformanceItem> {
		return this.calculatePerformanceData()
	}
}
