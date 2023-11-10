import { RouteObject } from 'react-router-dom'
import { ProfileLayout, RootLayout } from './layouts'
import { PAGES_PATHS, USER_ID_DEFAULT } from './constants'
import { ProfilePage } from './pages'
import { ProfileService } from './services'
import { UserActivity } from './models/user-activity.model'
import { UserModel } from './models'

export const routes: Array<RouteObject> = [
	{
		path: PAGES_PATHS['home'],
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <h1>Home page</h1>,
			},
			{
				path: PAGES_PATHS['profile'],
				element: <ProfileLayout />,
				children: [
					{
						index: true,
						element: <ProfilePage />,
						loader: async () => {
							const {
								getUserMainData,
								getUserActivity,
								getUserAverageSessions,
							} = ProfileService

							const user = await getUserMainData(USER_ID_DEFAULT)
							const userMainData = UserModel.createUser(user)
							const userId = userMainData.id

							const [activity, sessionsAvg] = await Promise.all([
								getUserActivity(userId),
								getUserAverageSessions(userId),
							])

							const userActivity =
								UserActivity.createUserActivity(
									activity,
									sessionsAvg
								)

							return { userMainData, userActivity }
						},
					},
				],
			},
			{
				path: PAGES_PATHS['settings'],
				element: <h1>Réglages</h1>,
			},
			{
				path: PAGES_PATHS['community'],
				element: <h1>Communauté</h1>,
			},
			{
				path: '*',
				element: (
					<div>
						<h1>404</h1>
					</div>
				),
			},
		],
	},
]
