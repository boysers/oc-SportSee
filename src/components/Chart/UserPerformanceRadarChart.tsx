import { UserPerformanceModel } from '@/models'
import {
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from '@/lib/recharts'

type UserPerformanceRadarChartProps = {
	userPerformance: UserPerformanceModel
}

export const UserPerformanceRadarChart: React.FC<
	UserPerformanceRadarChartProps
> = ({ userPerformance }) => {
	const { data } = userPerformance
	return (
		<div className="UserPerformanceRadarChart">
			<ResponsiveContainer>
				<RadarChart
					cx="50%"
					cy="50%"
					outerRadius="65%"
					data={[...data].reverse()}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<PolarGrid radialLines={false} stroke="#fff" />
					<PolarAngleAxis
						dataKey="name"
						stroke="#fff"
						tickLine={false}
					/>
					<Radar
						name="Performance"
						dataKey="value"
						fill="var(--primary-color)"
						fillOpacity={0.6}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	)
}
