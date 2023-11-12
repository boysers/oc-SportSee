import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	LegendProps,
	ResponsiveContainer,
	Tooltip,
	TooltipPayloadType,
	XAxis,
	YAxis,
} from '@/lib/recharts'

type DailyActivityBarChartProps = {
	sessions: Array<TSessionItem>
	caloriesDomain: DomainTuple
	kilogramDomain: DomainTuple
}

type CustomTooltipProps = {
	payload?: TooltipPayloadType
}

type DomainTuple = [number, number]

type TSessionItem = { dayOfWeekLetter: string; kilogram: number; calories: number }

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
	return (
		<div className="DailyActivityBarChart__legend">
			<p className="DailyActivityBarChart__legend__title">Activité quotidienne</p>
			<ul className="DailyActivityBarChart__legend__payload">
				{payload?.map((entry, index) => {
					const isCalories = entry.value === 'calories'
					const iconClassName = `DailyActivityBarChart__legend__payload__icon DailyActivityBarChart__legend__payload__icon--${
						isCalories ? 'red' : 'default'
					}`
					return (
						<li key={index} className="DailyActivityBarChart__legend__payload__label">
							<div className={iconClassName}></div>
							{isCalories ? `Calories brûlées (kCal)` : `Poids (kg)`}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
	return (
		<ul className="DailyActivityBarChart__tooltip">
			{payload?.map(({ value, name }, index) => (
				<li key={`${index}-${name}`}>{`${value}${name === 'calories' ? `kCal` : `kg`}`}</li>
			))}
		</ul>
	)
}

export const DailyActivityBarChart: React.FC<DailyActivityBarChartProps> = (props) => {
	const { sessions, caloriesDomain, kilogramDomain } = props
	return (
		<div
			className="DailyActivityBarChart"
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
						<Legend verticalAlign="top" content={<CustomLegend />} />
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
