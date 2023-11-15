import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { USER_ID_DEFAULT } from '@/utils/constants'
import { LoaderFunction } from 'react-router-dom'

type ProfileLoaderResults = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profileLoader: LoaderFunction<ProfileLoaderResults> = async (props) => {
	const params = new URL(props.request.url).searchParams

	props.request.signal

	const id = params.get('id')

	const userId = !id ? USER_ID_DEFAULT : Number(id)

	if (isNaN(userId)) {
		throw new Error('id is not a number')
	}

	const userService = new UserService({ userId, signal: props.request.signal })

	return await userService.getProfile()
}
