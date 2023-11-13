import { useLoaderData as useReactRouterLoaderData } from 'react-router-dom'

export function useLoaderData<D = unknown>(): D | null {
	return useReactRouterLoaderData() as D | null
}
