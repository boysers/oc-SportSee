import { ReactNode } from 'react'

type KeyInfoCardProps = {
	Icon: ReactNode
	name: string
	value: string
}

export const KeyInfoCard: React.FC<KeyInfoCardProps> = ({ Icon, name, value }) => {
	return (
		<div className="KeyInfoCard">
			<div className="KeyInfoCard__icon">{Icon}</div>
			<div className="KeyInfoCard__info">
				<p>{value}</p>
				<p>{name}</p>
			</div>
		</div>
	)
}
