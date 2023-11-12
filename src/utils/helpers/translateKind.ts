import { TRANSLATED_KINDS_FR } from '@/utils/constants'

export function translateKind(kind: string) {
	return TRANSLATED_KINDS_FR[kind] || kind
}
