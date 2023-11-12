import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipPayloadType,
} from '@/lib/recharts'

type DurationSessionsLineChartProps = {
	durationSessions: Array<TDurationSessionItem>
}

type CustomTooltipProps = {
	payload?: TooltipPayloadType
}

type TDurationSessionItem = {
	dayOfWeekLetter: string
	sessionLength: number
}

const CustomLegend: React.FC = () => {
	return <p className="DurationSessionsLineChart__title">Durée moyenne des sessions</p>
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
	return (
		<ul className="DurationSessionsLineChart__tooltip">
			{payload?.map(({ value }, index) => <li key={`${index}-${value}`}>{value} min</li>)}
		</ul>
	)
}

export const DurationSessionsLineChart: React.FC<DurationSessionsLineChartProps> = ({
	durationSessions,
}) => {
	return (
		<div
			className="DurationSessionsLineChart"
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
				<ResponsiveContainer>
					<LineChart
						data={durationSessions}
						margin={{
							top: 0,
							right: 0,
							left: 0,
							bottom: 56,
						}}
					>
						<Tooltip content={<CustomTooltip />} />
						<Legend verticalAlign="top" content={<CustomLegend />} />
						<Line
							type="monotone"
							dataKey="sessionLength"
							stroke="#fff"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
				<div className="DurationSessionsLineChart__labels">
					{durationSessions.map(({ dayOfWeekLetter }, index) => {
						return <span key={`${index}-${dayOfWeekLetter}`}>{dayOfWeekLetter}</span>
					})}
				</div>
			</div>
		</div>
	)
}
