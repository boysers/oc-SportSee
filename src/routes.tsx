import { RouteObject } from 'react-router-dom'
import { ProfileLayout, RootLayout } from './components/layout'
import { PATH_NAMES } from './utils/constants'
import { ProfilePage } from './pages/ProfilePage'
import { ErrorBoundary } from './components/commun'

export const routes: Array<RouteObject> = [
	{
		path: PATH_NAMES.home,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: null,
			},
			{
				path: PATH_NAMES.profile,
				element: <ProfileLayout />,
				errorElement: <ErrorBoundary />,
				children: [
					{
						index: true,
						element: <ProfilePage />,
					},
				],
			},
			{
				path: PATH_NAMES.settings,
				element: null,
			},
			{
				path: PATH_NAMES.community,
				element: null,
			},
			{
				path: '*',
				element: <ErrorBoundary />,
			},
		],
	},
]
