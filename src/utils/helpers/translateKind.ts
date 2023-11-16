import { TRANSLATED_KINDS_FR } from '@/utils/constants'
import { TrainingType } from '../types/TrainingType'

export function translateKind(kind: TrainingType) {
	return TRANSLATED_KINDS_FR[kind] || kind
}
