import { describe, expect, test } from 'vitest'
import { ResponseError } from './ResponseError'

describe('Testing ResponseError object', () => {
	const responseError = new ResponseError(404, 'Page not found')

	test('checks if the status property is 404', () => {
		expect(responseError.status).toStrictEqual(404)
	})

	test('checks if the message property is "Page not found"', () => {
		expect(responseError.message).toStrictEqual('Page not found')
	})
})
