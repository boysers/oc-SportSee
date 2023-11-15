import { KeyInfoCard } from '@/components/commun'
import { AppleIcon, BurgerIcon, FireIcon, MeatIcon } from '@/components/icon'

type ProfileKeyInfoCardListProps = {
	keyInfo: TKeyInfo
}

type TKeyInfo = {
	calorieCount: string
	proteinCount: string
	carbohydrateCount: string
	lipidCount: string
}

export const ProfileKeyInfoCardList: React.FC<ProfileKeyInfoCardListProps> = ({ keyInfo }) => {
	const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyInfo
	return (
		<div className="ProfilePage__container__info-cards">
			<KeyInfoCard name="Calories" value={calorieCount} Icon={<FireIcon />} />
			<KeyInfoCard name="Proteines" value={proteinCount} Icon={<MeatIcon />} />
			<KeyInfoCard name="Glucides" value={carbohydrateCount} Icon={<AppleIcon />} />
			<KeyInfoCard name="Lipides" value={lipidCount} Icon={<BurgerIcon />} />
		</div>
	)
}
