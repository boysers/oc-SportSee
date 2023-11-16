import { useState, useEffect } from 'react'
import { ResponseError } from '../helpers'

interface FetchHookResult<D> {
	data: D | null
	loading: boolean
	error: Error | null
}

export function useFetch<D = unknown>(
	asyncfunc: (signal?: AbortSignal) => Promise<D>
): FetchHookResult<D> {
	const [data, setData] = useState<D | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const abortController = new AbortController()

		async function startFetching() {
			try {
				setData(null)
				setLoading(true)
				setError(null)
				const result = await asyncfunc(abortController.signal)
				setData(result)
			} catch (error) {
				if (error instanceof ResponseError) {
					setError(error)
					return
				}
				if (error instanceof DOMException) return
				setError(new Error("Oups, une erreur inconnue s'est produite."))
			} finally {
				setLoading(false)
			}
		}

		startFetching()

		return () => {
			abortController.abort()
		}
	}, [asyncfunc])

	return { data, loading, error }
}
