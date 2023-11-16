import { expect, test } from 'vitest'
import { getMinMaxValues } from './getMinMaxValues'

test('gets the minimum and maximum numbers in the number array', () => {
	const numbers = [12, 50, 85, 2, 32]
	expect(getMinMaxValues(numbers)).toStrictEqual([2, 85])
})
