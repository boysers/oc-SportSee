import { expect, test } from 'vitest'
import { getDayOfWeekLetter } from './getDayOfWeekLetter'

test('return the day of the week letter', () => {
	// Jeudi 16 novembre 2023
	expect(getDayOfWeekLetter('2023-11-16')).toStrictEqual('J')
})
