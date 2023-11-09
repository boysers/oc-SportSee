import { RouteObject } from 'react-router-dom'
import { RootLayout } from './layouts'
import { PAGES_PATHS } from './constants'
import { ProfileLayout } from './layouts/ProfileLayout'

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
						element: <h1>Profil</h1>,
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
