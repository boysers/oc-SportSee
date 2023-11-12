import {
	TUserActivity,
	TUserActivitySessionItem,
	TUserAverageSession as TUserAvgSessions,
	TUserMergedActivity,
} from '@/utils/types/User.type'
import { getDayOfWeekLetter, getMinMaxValues } from '@/utils/helpers'

type NumberMin = number
type NumberMax = number

type MinMaxTuple = [NumberMin, NumberMax]
type DomainTuple = [NumberMin, NumberMax]

type TSession = TUserActivitySessionItem & { dayOfWeekLetter: TDayOfWeekLetter }

type TDurationSessionItem = { dayOfWeekLetter: TDayOfWeekLetter; sessionLength: number }

type TDayOfWeekLetter = string

export class UserActivityModel {
	static createUserActivity(
		activity: TUserActivity,
		userSessionsAvg: TUserAvgSessions
	): UserActivityModel {
		const { userId, sessions } = activity
		const avgSessions = userSessionsAvg.sessions
		const mergedSessions = sessions.map(({ day, ...session }, index) => ({
			date: day,
			...session,
			...avgSessions[index],
		}))
		return new UserActivityModel({ userId, sessions: mergedSessions })
	}

	private cachedSessions: Array<TSession> | undefined
	private cachedDurationSessions: Array<TDurationSessionItem> | undefined

	private cachedKiloMinMax: MinMaxTuple | undefined
	private cachedKiloDomain: DomainTuple | undefined

	private cachedCaloMinMax: MinMaxTuple | undefined
	private cachedCaloDomain: DomainTuple | undefined

	private constructor(private readonly userActivityData: TUserMergedActivity) {}

	private calculateSessions(): Array<TSession> {
		if (!this.cachedSessions) {
			this.cachedSessions = this.userActivityData.sessions.map(({ date, ...session }) => ({
				...session,
				dayOfWeekLetter: getDayOfWeekLetter(date),
				date,
			}))
		}
		return this.cachedSessions
	}

	private calculateDurationSessions(): Array<TDurationSessionItem> {
		if (!this.cachedDurationSessions) {
			const sessions = this.calculateSessions()
			this.cachedDurationSessions = sessions.map(({ dayOfWeekLetter, sessionLength }) => ({
				dayOfWeekLetter,
				sessionLength,
			}))
		}
		return this.cachedDurationSessions
	}

	private calculateDomain(valueMin: number, valueMax: number, step: number): DomainTuple {
		const domainMin =
			valueMin % step === 0 ? valueMin - step : Math.floor(valueMin / step) * step
		const domainMax =
			valueMax % step === 0 ? valueMax + step : Math.floor(valueMax / step) * step + step
		return [domainMin, domainMax]
	}

	private calculateKiloMinMax(): MinMaxTuple {
		if (!this.cachedKiloMinMax) {
			const kilograms = this.calculateSessions().map(({ kilogram }) => kilogram)
			this.cachedKiloMinMax = getMinMaxValues(kilograms)
		}
		return this.cachedKiloMinMax
	}

	private calculateCaloMinMax(): MinMaxTuple {
		if (!this.cachedCaloMinMax) {
			const calories = this.calculateSessions().map(({ calories }) => calories)
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

	get sessions(): Array<TSession> {
		return this.calculateSessions()
	}

	get durationSessions(): Array<TDurationSessionItem> {
		return this.calculateDurationSessions()
	}

	get kilogramDomain(): MinMaxTuple {
		return this.calculeKiloDomain()
	}

	get caloriesDomain(): DomainTuple {
		return this.calculeCaloDomain()
	}
}
