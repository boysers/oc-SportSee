import { UserActivityModel, UserModel } from './models'

export type ProfilePageLoader = {
	userMainData: UserModel
	userActivity: UserActivityModel
}

export type TUser = {
	id: TUserId
	userInfos: TUserInfos
	keyData: TKeyData
	todayScore?: number
	score?: number
}

export type TUserActivity = {
	userId: TUserId
	sessions: Array<TActivitySession>
}

export type TUserAverageSession = {
	userId: TUserId
	sessions: Array<TAverageSession>
}

export type TUserPerformance = {
	userId: number
	kind: Record<number, string>
	data: Array<{
		value: number
		kind: number
	}>
}

type TUserId = number

type TUserInfos = {
	firstName: string
	lastName: string
	age: number
}

type TKeyData = {
	calorieCount: number
	proteinCount: number
	carbohydrateCount: number
	lipidCount: number
}

type TActivitySession = {
	day: string
	kilogram: number
	calories: number
}

type TAverageSession = {
	day: number
	sessionLength: number
}
