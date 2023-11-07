import { RouteObject } from 'react-router-dom'
import { RootLayout } from './layouts'
import { PAGES_PATHS } from './constants'

export const routes: Array<RouteObject> = [
	{
		path: PAGES_PATHS['home'],
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <h1>home page</h1>,
			},
			{
				path: PAGES_PATHS['profile'],
				element: <h1>Profil</h1>,
			},
			{
				path: PAGES_PATHS['settings'],
				element: <h1>Réglages</h1>,
			},
			{
				path: PAGES_PATHS['community'],
				element: <h1>Communauté</h1>,
			},
		],
	},
]
