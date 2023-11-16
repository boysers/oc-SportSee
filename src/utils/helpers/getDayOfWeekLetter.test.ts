import { expect, test, describe } from 'vitest'
import { getDayOfWeekLetter } from './getDayOfWeekLetter'

describe('Testing getDayOfWeekLetter function', () => {
	test('returns "L" for Lundi', () => {
		// Lundi 13 novembre 2023
		const dateString = '2023-11-13'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('L')
	})

	test('returns "M" for Mardi', () => {
		// Mardi 14 novembre 2023
		const dateString = '2023-11-14'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('M')
	})

	test('returns "M" for Mercredi', () => {
		// Mercredi 15 novembre 2023
		const dateString = '2023-11-15'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('M')
	})

	test('returns "J" for Jeudi', () => {
		// Jeudi 16 novembre 2023
		const dateString = '2023-11-16'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('J')
	})

	test('returns "V" for Vendredi', () => {
		// Vendredi 17 novembre 2023
		const dateString = '2023-11-17'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('V')
	})

	test('returns "S" for Samedi', () => {
		// Samedi 18 novembre 2023
		const dateString = '2023-11-18'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('S')
	})

	test('returns "D" for Dimanche', () => {
		// Dimanche 19 novembre 2023
		const dateString = '2023-11-19'
		expect(getDayOfWeekLetter(dateString)).toStrictEqual('D')
	})
})
