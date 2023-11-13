import { ResponseError } from '@/utils/helpers'
import { useRouteError } from 'react-router-dom'

type ErrorBoundaryContainerProps = {
	status: number
	message: string
}

const ErrorBoundaryContainer: React.FC<ErrorBoundaryContainerProps> = ({ message, status }) => {
	return (
		<div className="ErrorBoundary">
			<div className="ErrorBoundary__container">
				<h1>{status ?? 404}</h1>
				<p>{message ?? "Oups, cette page n'existe pas."}</p>
			</div>
		</div>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError() as ResponseError | null

	if (!error) {
		return <ErrorBoundaryContainer status={404} message="Oups, cette page n'existe pas." />
	}

	if (error.message === 'Failed to fetch') {
		return <ErrorBoundaryContainer status={500} message="It's terrible!" />
	}

	return <ErrorBoundaryContainer status={error.status} message={error.message} />
}
