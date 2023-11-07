import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { URL, fileURLToPath } from 'node:url'

const alias = [
	{ name: '@', path: './src' },
	{ name: '@assets', path: './src/assets' },
	{ name: '@components', path: './src/components' },
	{ name: '@layouts', path: './src/layouts' },
	{ name: '@pages', path: './src/pages' },
	{ name: '@utils', path: './src/utils' },
]

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: alias.map(({ name, path }) => ({
			find: name,
			replacement: fileURLToPath(new URL(path, import.meta.url)),
		})),
	},
	plugins: [react()],
})
