import { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'

export const useProfileContext = () => {
	const profileContext = useContext(ProfileContext)

	if (!profileContext) throw new Error('ProfileContext undefind')

	return profileContext
}
