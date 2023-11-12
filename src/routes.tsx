import { RouteObject } from 'react-router-dom'
import { ProfileLayout, RootLayout } from './components/layout'
import { PATH_NAMES } from './utils/constants'
import { ProfilePage, profileLoader } from './pages/ProfilePage'

export const routes: Array<RouteObject> = [
	{
		path: PATH_NAMES.home,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <h1>Home page</h1>,
			},
			{
				path: PATH_NAMES.profile,
				loader: profileLoader,
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
				path: PATH_NAMES.settings,
				element: <h1>Réglages</h1>,
			},
			{
				path: PATH_NAMES.community,
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
