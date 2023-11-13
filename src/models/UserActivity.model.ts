import { TUserActivity, TUserAverageSession } from '@/utils/types/User.type'
import { getDayOfWeekLetter, getMinMaxValues } from '@/utils/helpers'

type UserActivityData = {
	userId: number
	sessions: Array<Omit<SessionItem, 'dayOfWeekLetter'>>
}

type SessionItem = {
	date: string
	day: number
	sessionLength: number
	kilogram: number
	calories: number
	dayOfWeekLetter: string
}

export class UserActivityModel {
	static createUserActivity(
		activity: TUserActivity,
		userSessions: TUserAverageSession
	): UserActivityModel {
		const { userId, sessions } = activity
		const avgSessions = userSessions.sessions
		const mergedSessions = sessions.map(({ day, ...session }, index) => ({
			date: day,
			...session,
			...avgSessions[index],
		}))
		return new UserActivityModel({ userId, sessions: mergedSessions })
	}

	private cachedSessions: Array<SessionItem> | undefined

	private cachedKiloMinMax: [number, number] | undefined
	private cachedKiloDomain: [number, number] | undefined

	private cachedCaloMinMax: [number, number] | undefined
	private cachedCaloDomain: [number, number] | undefined

	private constructor(private readonly userActivityData: UserActivityData) {}

	private formatSessions(): Array<SessionItem> {
		if (!this.cachedSessions) {
			this.cachedSessions = this.userActivityData.sessions.map(({ date, ...session }) => ({
				...session,
				dayOfWeekLetter: getDayOfWeekLetter(date),
				date,
			}))
		}
		return this.cachedSessions
	}

	private calculateDomain(valueMin: number, valueMax: number, step: number): [number, number] {
		const domainMin =
			valueMin % step === 0 ? valueMin - step : Math.floor(valueMin / step) * step
		const domainMax =
			valueMax % step === 0 ? valueMax + step : Math.floor(valueMax / step) * step + step
		return [domainMin, domainMax]
	}

	private calculateKiloMinMax(): [number, number] {
		if (!this.cachedKiloMinMax) {
			const kilograms = this.formatSessions().map(({ kilogram }) => kilogram)
			this.cachedKiloMinMax = getMinMaxValues(kilograms)
		}
		return this.cachedKiloMinMax
	}

	private calculateCaloMinMax(): [number, number] {
		if (!this.cachedCaloMinMax) {
			const calories = this.formatSessions().map(({ calories }) => calories)
			this.cachedCaloMinMax = getMinMaxValues(calories)
		}
		return this.cachedCaloMinMax
	}

	private calculeKiloDomain() {
		if (!this.cachedKiloDomain) {
			const [min, max] = this.calculateKiloMinMax()
			this.cachedKiloDomain = this.calculateDomain(min, max, 10)
		}
		return this.cachedKiloDomain
	}

	private calculeCaloDomain() {
		if (!this.cachedCaloDomain) {
			const [min, max] = this.calculateCaloMinMax()
			this.cachedCaloDomain = this.calculateDomain(min, max, 100)
		}
		return this.cachedCaloDomain
	}

	get sessions(): Array<SessionItem> {
		return this.formatSessions()
	}

	get kilogramDomain(): [number, number] {
		return this.calculeKiloDomain()
	}

	get caloriesDomain(): [number, number] {
		return this.calculeCaloDomain()
	}
}
