import { useEffect, useRef, useState } from 'react'
import {
	Legend,
	LegendProps,
	PolarAngleAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from '@/lib/recharts'

type CustomLegendProps = LegendProps & {
	avgScore: number
	responsiveScale: number
}

type UserAvgScoreRadialBarChartProps = {
	avgScore: number
}

const CustomLegend: React.FC<CustomLegendProps> = ({
	avgScore,
	responsiveScale,
}) => {
	return (
		<p
			className="UserAvgScorePieChart__legend"
			style={{ transform: `scale(${responsiveScale})` }}
		>
			{`${Math.floor(avgScore * 100)}%`}
			<br />
			<span>
				de votre
				<br />
				objectif
			</span>
		</p>
	)
}

export const UserAvgScoreRadialBarChart: React.FC<
	UserAvgScoreRadialBarChartProps
> = ({ avgScore }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [responsiveScale, setResponsiveScale] = useState(1)

	useEffect(() => {
		const element = ref.current

		if (!element) return

		const handleResize = () => {
			const scale = Number((element.clientWidth / 250).toFixed(2))
			setResponsiveScale(scale)
		}

		const resizeObserver = new ResizeObserver(handleResize)

		resizeObserver.observe(element)

		return () => {
			resizeObserver.unobserve(element)
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<div
			ref={ref}
			className="UserAvgScorePieChart"
			style={{
				position: 'relative',
				width: '100%',
				paddingBottom: '263px',
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
				<p className="UserAvgScorePieChart__title">Score</p>
				<ResponsiveContainer>
					<RadialBarChart
						cx="50%"
						cy="50%"
						innerRadius="65%"
						barSize={10}
						data={[{ value: avgScore }]}
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
									avgScore={avgScore}
									responsiveScale={responsiveScale}
								/>
							}
							align="center"
						/>
						<circle
							fill="#fff"
							cx="50%"
							cy="50%"
							r={`${responsiveScale * 73}px`}
						/>
					</RadialBarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
