export function getMinMaxValues(data: number[]): [number, number] {
	return [Math.min(...data), Math.max(...data)]
}
