import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	LegendProps,
	NameType,
	ResponsiveContainer,
	Tooltip,
	TooltipPayloadType,
	ValueType,
	XAxis,
	YAxis,
} from '@/lib/recharts'
import { UserActivityModel } from '@/models'

type PayloadItemType = TooltipPayloadType<ValueType, NameType>

type CustomTooltipProps = {
	payload?: Array<PayloadItemType>
}

type UserActivityBarChartProps = { userActivity: UserActivityModel }

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
	return (
		<div className="CustomLegend">
			<p className="CustomLegend__title">Activité quotidienne</p>
			<ul className="CustomLegend__payload">
				{payload?.map((entry, index) => {
					const isCalories = entry.value === 'calories'
					const iconClassName = `CustomLegend__payload__icon CustomLegend__payload__icon--${
						isCalories ? 'red' : 'default'
					}`
					return (
						<li
							key={index}
							className="CustomLegend__payload__label"
						>
							<div className={iconClassName}></div>
							{isCalories
								? `Calories brûlées (kCal)`
								: `Poids (kg)`}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
	return (
		<ul className="CustomTooltip">
			{payload?.map(({ value, name }, index) => (
				<li key={`${index}-${name}`}>
					{`${value}${name === 'calories' ? `kcal` : `kg`}`}
				</li>
			))}
		</ul>
	)
}

export const UserActivityBarChart: React.FC<UserActivityBarChartProps> = ({
	userActivity,
}) => {
	const { sessions, caloriesDomain, kilogramDomain } = userActivity
	return (
		<div
			className="UserActivityBarChart"
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
					padding: '24px',
				}}
			>
				<ResponsiveContainer>
					<BarChart
						data={sessions}
						margin={{
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						}}
						barSize={8}
						barGap={8}
					>
						<CartesianGrid strokeDasharray="3" vertical={false} />
						<XAxis
							dataKey="day"
							stroke="#9B9EAC"
							axisLine={{ stroke: '#c8c8c8' }}
							tickLine={false}
							tickMargin={10}
							scale="point"
							padding={{ left: 16, right: 12 }}
						/>
						<YAxis
							yAxisId="kilogram"
							orientation="right"
							tickMargin={16}
							stroke="#9B9EAC"
							tickLine={false}
							axisLine={false}
							domain={kilogramDomain}
							tickCount={3}
						/>
						<YAxis
							yAxisId="calories"
							orientation="left"
							domain={caloriesDomain}
							tickCount={3}
							hide
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							verticalAlign="top"
							content={<CustomLegend />}
						/>
						<Bar
							yAxisId="kilogram"
							dataKey="kilogram"
							fill="var(--secondary-color)"
							radius={[12, 12, 0, 0]}
						/>
						<Bar
							yAxisId="calories"
							dataKey="calories"
							fill="var(--primary-color)"
							radius={[12, 12, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
