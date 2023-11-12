import { ReactNode } from 'react'

type CardInfoProps = {
	Icon: ReactNode
	name: string
	value: string
}

export const CardInfo: React.FC<CardInfoProps> = ({ Icon, name, value }) => {
	return (
		<div className="CardInfo">
			<div className="CardInfo__icon">{Icon}</div>
			<div className="CardInfo__info">
				<p>{value}</p>
				<p>{name}</p>
			</div>
		</div>
	)
}
