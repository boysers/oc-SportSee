import { TUserActivity } from '@/types'

type MinMaxTuple = [number, number]
type DomainValues = [number, number]

type TUserActivitySession = {
	day: string
	kilogram: number
	calories: number
}

export class UserActivity {
	static createUserActivity(userActivityData: TUserActivity): UserActivity {
		return new UserActivity(userActivityData)
	}

	private cachedSessions: Array<TUserActivitySession> | undefined
	private cachedKiloMinMax: MinMaxTuple | undefined
	private cachedKiloDomain: DomainValues | undefined
	private cachedCaloMinMax: MinMaxTuple | undefined
	private cachedCaloDomain: DomainValues | undefined

	private constructor(private readonly userActivityData: TUserActivity) {}

	private calculateSessions(): Array<TUserActivitySession> {
		if (!this.cachedSessions) {
			this.cachedSessions = this.userActivityData.sessions.map(
				({ day, calories, kilogram }) => ({
					day: this.getDay(day).toString(),
					calories,
					kilogram,
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

	private getDay(dateStr: string): number {
		return new Date(dateStr).getDate()
	}

	get sessions(): Array<TUserActivitySession> {
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
