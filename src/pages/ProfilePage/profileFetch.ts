import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { USER_ID_DEFAULT } from '@/utils/constants'

type ProfileFetchResults = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profileFetch: (signal?: AbortSignal | null) => Promise<ProfileFetchResults> = async (
	signal
) => {
	const id = new URL(document.location.href).searchParams.get('id')
	const userId = !id ? USER_ID_DEFAULT : Number(id)

	if (isNaN(userId)) {
		throw new Error('id is not a number')
	}

	const userService = new UserService({ userId, signal })

	return await userService.getProfile()
}
