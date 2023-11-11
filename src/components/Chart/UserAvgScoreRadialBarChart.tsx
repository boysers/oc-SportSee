import {
	PolarAngleAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from '@/lib/recharts'

type UserAvgScoreRadialBarChartProps = {
	avgScorePercentage: string
	avgScore: number
}

export const UserAvgScoreRadialBarChart: React.FC<
	UserAvgScoreRadialBarChartProps
> = ({ avgScorePercentage, avgScore }) => {
	return (
		<div className="UserAvgScorePieChart">
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
					/>
					<circle fill="#fff" cx="50%" cy="50%" r="74px" />
				</RadialBarChart>
			</ResponsiveContainer>
			<p className="UserAvgScorePieChart__content">
				{avgScorePercentage}
				<span> de votre objectif</span>
			</p>
		</div>
	)
}
