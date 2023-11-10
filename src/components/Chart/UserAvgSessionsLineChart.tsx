import { UserActivity } from '@/models/user-activity.model'
import {
	Legend,
	Line,
	LineChart,
	NameType,
	ResponsiveContainer,
	Tooltip,
	TooltipPayloadType,
	ValueType,
} from '@/lib/recharts'

type PayloadItemType = TooltipPayloadType<ValueType, NameType>

type CustomTooltipProps = {
	payload?: Array<PayloadItemType>
}

type UserAvgSessionsLineChartProps = {
	userActivity: UserActivity
}

const CustomLegend: React.FC = () => {
	return (
		<p className="UserAvgSessionsLineChart__title">
			Durée moyenne des sessions
		</p>
	)
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
	return (
		<ul className="UserAvgSessionsLineChart__tooltip">
			{payload?.map(({ value }, index) => (
				<li key={`${index}-${value}`}>{value} min</li>
			))}
		</ul>
	)
}

export const UserAvgSessionsLineChart: React.FC<
	UserAvgSessionsLineChartProps
> = ({ userActivity }) => {
	const { sessions } = userActivity
	return (
		<div className="UserAvgSessionsLineChart">
			<ResponsiveContainer width="100%" height="85%">
				<LineChart
					width={250}
					height={250}
					data={sessions}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 16,
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
			<div className="UserAvgSessionsLineChart__labels">
				{sessions.map(({ dayOfWeekLetter }, index) => {
					return (
						<span key={`${index}-${dayOfWeekLetter}`}>
							{dayOfWeekLetter}
						</span>
					)
				})}
			</div>
		</div>
	)
}
