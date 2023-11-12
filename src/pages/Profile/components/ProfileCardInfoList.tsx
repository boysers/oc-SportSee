import { CardInfo } from '@/components/commun'
import { AppleIcon, BurgerIcon, FireIcon, MeatIcon } from '@/components/icon'

type ProfileCardInfoListProps = {
	keyData: {
		calorieCount: number
		proteinCount: number
		carbohydrateCount: number
		lipidCount: number
	}
}

export const ProfileCardInfoList: React.FC<ProfileCardInfoListProps> = ({ keyData }) => {
	const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData
	return (
		<div className="ProfilePage__container__info-cards">
			<CardInfo name="Calories" value={`${calorieCount}kCal`} Icon={<FireIcon />} />
			<CardInfo name="Proteines" value={`${proteinCount}kg`} Icon={<MeatIcon />} />
			<CardInfo name="Glucides" value={`${carbohydrateCount}kg`} Icon={<AppleIcon />} />
			<CardInfo name="Lipides" value={`${lipidCount}kg`} Icon={<BurgerIcon />} />
		</div>
	)
}
