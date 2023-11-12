import { useEffect, useRef, useState } from 'react'
import {
	Legend,
	LegendProps,
	PolarAngleAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from '@/lib/recharts'

type AverageScoreRadialBarChartProps = {
	averageScore: TAverageScore
}

type CustomLegendProps = LegendProps & {
	averageScore: TAverageScore
	responsiveScale: number
}

type TAverageScore = number

const CustomLegend: React.FC<CustomLegendProps> = ({ averageScore, responsiveScale }) => {
	return (
		<p
			className="AverageScoreRadialBarChart__legend"
			style={{ transform: `scale(${responsiveScale})` }}
		>
			{`${Math.floor(averageScore * 100)}%`}
			<br />
			<span>
				de votre
				<br />
				objectif
			</span>
		</p>
	)
}

export const AverageScoreRadialBarChart: React.FC<AverageScoreRadialBarChartProps> = ({
	averageScore,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [responsiveScale, setResponsiveScale] = useState(1)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const handleResize = () => {
			const width = Number((element.clientWidth / 250).toFixed(2))
			const height = Number((element.clientHeight / 250).toFixed(2))
			setResponsiveScale(height < width ? height : width)
		}
		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div
			ref={ref}
			className="AverageScoreRadialBarChart"
			style={{
				position: 'relative',
				width: '100%',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				}}
			>
				<p className="AverageScoreRadialBarChart__title">Score</p>
				<ResponsiveContainer>
					<RadialBarChart
						cx="50%"
						cy="50%"
						innerRadius="65%"
						barSize={10}
						data={[{ value: averageScore }]}
						startAngle={90}
						endAngle={360 + 90}
					>
						<PolarAngleAxis
							type="number"
							domain={[0, 1]}
							angleAxisId={0}
							tick={false}
						/>
						<RadialBar
							label={{ display: 'none' }}
							dataKey="value"
							cornerRadius={10}
							fill="var(--primary-color)"
							stroke-linejoin="round"
							colorProfile="red"
						/>
						<Legend
							verticalAlign="middle"
							content={
								<CustomLegend
									averageScore={averageScore}
									responsiveScale={responsiveScale}
								/>
							}
							align="center"
						/>
						<circle fill="#fff" cx="50%" cy="50%" r={`${responsiveScale * 72.5}px`} />
					</RadialBarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
