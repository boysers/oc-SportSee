import { RouteObject } from 'react-router-dom'
import { ProfileLayout, RootLayout } from './layouts'
import { PAGE_PATH_NAMES } from './constants'
import { ProfilePage, profilePageLoader } from './pages'

export const routes: Array<RouteObject> = [
	{
		path: PAGE_PATH_NAMES['home'],
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <h1>Home page</h1>,
			},
			{
				path: PAGE_PATH_NAMES['profile'],
				loader: profilePageLoader,
				element: <ProfileLayout />,
				id: 'user-profile',
				children: [
					{
						index: true,
						element: <ProfilePage />,
					},
				],
			},
			{
				path: PAGE_PATH_NAMES['settings'],
				element: <h1>Réglages</h1>,
			},
			{
				path: PAGE_PATH_NAMES['community'],
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
