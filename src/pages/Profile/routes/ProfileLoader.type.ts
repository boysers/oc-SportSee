import { UserActivityModel, UserModel, UserPerformanceModel } from '@/models'

export type TProfileLoader = {
	userMainData: UserModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}
