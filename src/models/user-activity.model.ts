import { DAY_LETTERS } from '@/constants'
import {
	TUserActivity,
	TUserActivitySessionItem,
	TUserAverageSession as TUserAvgSessions,
	TUserMergedActivity,
} from '@/types'

type MinMaxTuple = [number, number]
type DomainValues = [number, number]

type Session = TUserActivitySessionItem & { dayOfWeekLetter: string }

export class UserActivity {
	static createUserActivity(
		activity: TUserActivity,
		userSessionsAvg: TUserAvgSessions
	): UserActivity {
		const { userId, sessions } = activity
		const avgSessions = userSessionsAvg.sessions
		const mergedSessions = sessions.map(({ day, ...session }, index) => ({
			date: day,
			...session,
			...avgSessions[index],
		}))
		return new UserActivity({ userId, sessions: mergedSessions })
	}

	private cachedSessions: Array<Session> | undefined
	private cachedKiloMinMax: MinMaxTuple | undefined
	private cachedKiloDomain: DomainValues | undefined
	private cachedCaloMinMax: MinMaxTuple | undefined
	private cachedCaloDomain: DomainValues | undefined

	private constructor(
		private readonly userActivityData: TUserMergedActivity
	) {}

	private calculateSessions(): Array<Session> {
		if (!this.cachedSessions) {
			this.cachedSessions = this.userActivityData.sessions.map(
				({ date, ...session }) => ({
					...session,
					dayOfWeekLetter: this.getDayOfWeekLetter(date),
					date,
				})
			)
		}
		return this.cachedSessions
	}

	private calculateMinMax(data: number[]): [number, number] {
		return [Math.min(...data), Math.max(...data)]
	}

	private calculateDomain(
		valueMin: number,
		valueMax: number,
		step: number
	): DomainValues {
		const domainMin =
			valueMin % step === 0
				? valueMin - step
				: Math.floor(valueMin / step) * step
		const domainMax =
			valueMax % step === 0
				? valueMax + step
				: Math.floor(valueMax / step) * step + step
		return [domainMin, domainMax]
	}

	private calculateKiloMinMax(): MinMaxTuple {
		if (!this.cachedKiloMinMax) {
			const kilograms = this.calculateSessions().map(
				({ kilogram }) => kilogram
			)
			this.cachedKiloMinMax = this.calculateMinMax(kilograms)
		}
		return this.cachedKiloMinMax
	}

	private calculateCaloMinMax(): MinMaxTuple {
		if (!this.cachedCaloMinMax) {
			const calories = this.calculateSessions().map(
				({ calories }) => calories
			)
			this.cachedCaloMinMax = this.calculateMinMax(calories)
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

	private getDayOfWeekLetter(dateStr: string): string {
		const dayOfWeek = new Date(dateStr).getDay()
		return DAY_LETTERS[dayOfWeek]
	}

	get userId(): number {
		return this.userActivityData.userId
	}

	get sessions(): Array<Session> {
		return this.calculateSessions()
	}

	get kilogramMin(): number {
		return this.calculateKiloMinMax()[0]
	}

	get kilogramMax(): number {
		return this.calculateKiloMinMax()[1]
	}

	get kilogramDomain(): [number, number] {
		return this.calculeKiloDomain()
	}

	get caloriesMin(): number {
		return this.calculateCaloMinMax()[0]
	}

	get caloriesMax(): number {
		return this.calculateCaloMinMax()[1]
	}

	get caloriesDomain(): [number, number] {
		return this.calculeCaloDomain()
	}
}
