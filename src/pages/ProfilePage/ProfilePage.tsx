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

type CardInfoListProps = {
	keyData: {
		calorieCount: number
		proteinCount: number
		carbohydrateCount: number
		lipidCount: number
	}
}

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

const CardInfoList: React.FC<CardInfoListProps> = ({ keyData }) => {
	const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
		keyData
	return (
		<div className="ProfilePage__container__info-cards">
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
	)
}

export const ProfilePage: React.FC = () => {
	const { userMainData, userActivity, userPerformance } = useRouteLoaderData(
		'user-profile'
	) as TProfilePageLoader
	const { keyData, userInfos, avgScore } = userMainData
	return (
		<div className="ProfilePage">
			<Header firstName={userInfos.firstName} />
			<div className="ProfilePage__container">
				<div className="ProfilePage__container__charts">
					<UserActivityBarChart userActivity={userActivity} />
					<div className="ProfilePage__container__charts__stats">
						<UserAvgSessionsLineChart userActivity={userActivity} />
						<UserPerformanceRadarChart
							userPerformance={userPerformance}
						/>
						<UserAvgScoreRadialBarChart avgScore={avgScore} />
					</div>
				</div>
				<CardInfoList keyData={keyData} />
			</div>
		</div>
	)
}
