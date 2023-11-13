import { useState, useEffect } from 'react'

interface FetchHookResult<D> {
	data: D | null
	loading: boolean
	error: Error | null
}

export function useFetch<D = unknown>(
	apiFunc: (signal?: AbortSignal) => Promise<D>
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
				const result = await apiFunc(abortController.signal)
				if (!ignore) {
					setData(result)
				}
			} catch (error) {
				if (error instanceof Error) {
					setError(error)
				}
			} finally {
				setLoading(false)
			}
		}

		let ignore = false
		startFetching()

		return () => {
			ignore = true
			abortController.abort()
		}
	}, [apiFunc])

	return { data, loading, error }
}
