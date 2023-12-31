import { useEffect, useRef, useState } from 'react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from '@/lib/recharts'

type ActivityTypeRadarChartProps = {
	activities: Array<TActivityItem>
}

type TActivityItem = {
	name: string
	value: number
}

export const ActivityTypeRadarChart: React.FC<ActivityTypeRadarChartProps> = ({ activities }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [responsiveScale, setResponsiveScale] = useState(1)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const handleResize = () => {
			const scale = Number((element.clientWidth / 200).toFixed(2))
			scale < 1 ? setResponsiveScale(scale + 0.15) : setResponsiveScale(scale)
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
			className="ActivityTypeRadarChart"
			style={{
				position: 'relative',
				width: '100%',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
					transform: `scale(${responsiveScale})`,
				}}
			>
				<ResponsiveContainer>
					<RadarChart
						cx="50%"
						cy="50%"
						outerRadius="50%"
						data={[...activities].reverse()}
						margin={{
							top: 0,
							right: 8,
							left: 8,
							bottom: 0,
						}}
					>
						<PolarGrid radialLines={false} stroke="#fff" />
						<PolarAngleAxis dataKey="name" stroke="#fff" tickLine={false} />
						<Radar
							name="Performance"
							dataKey="value"
							fill="var(--primary-color)"
							fillOpacity={0.6}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
