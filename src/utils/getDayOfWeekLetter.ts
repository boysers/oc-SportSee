import { DAY_LETTERS } from '@/utils/constants'

export function getDayOfWeekLetter(dateStr: string): string {
	const dayOfWeek = new Date(dateStr).getDay()
	return DAY_LETTERS[dayOfWeek]
}
