import { IconProps } from './IconProps'

export const YogaIcon: React.FC<IconProps> = ({
	backgroundColor = 'white',
	color = '#FF0101',
	size = 64,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 64 64"
			fill="none"
		>
			<rect width={size} height={size} rx="6" fill={backgroundColor} />
			<path
				d="M32 22C34.2091 22 36 20.2091 36 18C36 15.7909 34.2091 14 32 14C29.7909 14 28 15.7909 28 18C28 20.2091 29.7909 22 32 22Z"
				fill={color}
			/>
			<path
				d="M50 38V34C45.52 34 41.68 32.08 38.8 28.64L36.12 25.44C35.36 24.52 34.24 24 33.06 24H30.96C29.78 24 28.66 24.52 27.9 25.44L25.22 28.64C22.32 32.08 18.48 34 14 34V38C19.54 38 24.38 35.66 28 31.5V36L20.24 39.1C18.9 39.64 18 40.96 18 42.42C18 44.4 19.6 46 21.58 46H26V45C26 42.24 28.24 40 31 40H37C37.56 40 38 40.44 38 41C38 41.56 37.56 42 37 42H31C29.34 42 28 43.34 28 45V46H42.42C44.4 46 46 44.4 46 42.42C46 40.96 45.1 39.64 43.76 39.1L36 36V31.5C39.62 35.66 44.46 38 50 38Z"
				fill={color}
			/>
		</svg>
	)
}
