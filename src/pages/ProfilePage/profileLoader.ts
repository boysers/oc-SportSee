import { UserActivityModel, UserInfoModel, UserPerformanceModel } from '@/models'
import { UserService } from '@/services'
import { USER_ID_DEFAULT } from '@/utils/constants'
import { LoaderFunction, json } from 'react-router-dom'

export type ProfileLoaderResults = {
	userInfo: UserInfoModel
	userActivity: UserActivityModel
	userPerformance: UserPerformanceModel
}

export const profileLoader: LoaderFunction<ProfileLoaderResults> = async (props) => {
	const params = new URL(props.request.url).searchParams

	props.request.signal

	const idParam = params.get('id')

	const userId = !idParam ? USER_ID_DEFAULT : Number(idParam)

	if (isNaN(userId)) {
		throw json({ message: 'id is not a number' }, { status: 400 })
	}

	const userService = new UserService({ userId, signal: props.request.signal })

	return await userService.getProfile()
}
