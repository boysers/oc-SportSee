import { describe, expect, test } from 'vitest'
import { translateKind } from './translateKind'

describe('Translate EN to FR of Training types', () => {
	test('translate "speed" to "Vitesse"', () => {
		expect(translateKind('speed')).toStrictEqual('Vitesse')
	})

	test('translate "endurance" to "Endurance"', () => {
		expect(translateKind('endurance')).toStrictEqual('Endurance')
	})

	test('translate "energy" to "Energie"', () => {
		expect(translateKind('energy')).toStrictEqual('Energie')
	})

	test('translate "strength" to "Force"', () => {
		expect(translateKind('strength')).toStrictEqual('Force')
	})

	test('translate "cardio" to "Cardio"', () => {
		expect(translateKind('cardio')).toStrictEqual('Cardio')
	})

	test('translate "intensity" to "Intencité"', () => {
		expect(translateKind('intensity')).toStrictEqual('Intencité')
	})
})
