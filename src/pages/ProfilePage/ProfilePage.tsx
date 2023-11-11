import {
	UserActivityBarChart,
	UserAvgScoreRadialBarChart,
	UserAvgSessionsLineChart,
	UserPerformanceRadarChart,
} from '@/components/Chart'
import { useRouteLoaderData } from 'react-router-dom'
import { TProfilePageLoader } from './loader'
import { CardInfo } from '@/components/Commun'
import { AppleIcon, BurgerIcon, FireIcon, MeatIcon } from '@/components/Icon'

type HeaderProps = { firstName: string }

const Header: React.FC<HeaderProps> = ({ firstName }) => {
	return (
		<div className="ProfilePage__header">
			<h1 className="ProfilePage__header__title">
				Bonjour <span>{firstName}</span>
			</h1>
			<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
		</div>
	)
}

export const ProfilePage: React.FC = () => {
	const { userMainData, userActivity, userPerformance } = useRouteLoaderData(
		'user-profile'
	) as TProfilePageLoader
	const {
		keyData: { calorieCount, proteinCount, carbohydrateCount, lipidCount },
		userInfos: { firstName },
		avgScorePercentage,
		avgScore,
	} = userMainData
	return (
		<div className="ProfilePage">
			<Header firstName={firstName} />
			<div className="ProfilePage__container">
				<div className="ProfilePage__container__charts">
					<UserActivityBarChart userActivity={userActivity} />
					<div className="ProfilePage__container__charts__stats">
						<UserAvgSessionsLineChart userActivity={userActivity} />
						<UserPerformanceRadarChart
							userPerformance={userPerformance}
						/>
						<UserAvgScoreRadialBarChart
							avgScorePercentage={avgScorePercentage}
							avgScore={avgScore}
						/>
					</div>
				</div>
				<div className="ProfilePage__container__cards-infos">
					<CardInfo
						name="Calories"
						value={`${calorieCount}kCal`}
						Icon={<FireIcon />}
					/>
					<CardInfo
						name="Proteines"
						value={`${proteinCount}kg`}
						Icon={<MeatIcon />}
					/>
					<CardInfo
						name="Glucides"
						value={`${carbohydrateCount}kg`}
						Icon={<AppleIcon />}
					/>
					<CardInfo
						name="Lipides"
						value={`${lipidCount}kg`}
						Icon={<BurgerIcon />}
					/>
				</div>
			</div>
		</div>
	)
}
