import { RouteObject } from 'react-router-dom'
import { ProfileLayout, RootLayout } from './layouts'
import { PAGES_PATHS } from './constants'
import { ProfilePage } from './pages'
import { ProfileService } from './services'

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
							return await ProfileService.getUserMainData(12)
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
