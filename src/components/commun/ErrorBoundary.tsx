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
				<h1>{status}</h1>
				<p>{message}</p>
			</div>
		</div>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError() as { data: { message: string }; status: number } | null

	if (error?.data?.message && !isNaN(error.status)) {
		return <ErrorBoundaryContainer status={error.status} message={error.data.message} />
	}

	if (error instanceof ResponseError) {
		return <ErrorBoundaryContainer status={error.status} message={error.message} />
	}

	if (error instanceof Error) {
		return (
			<ErrorBoundaryContainer
				status={500}
				message="Oups, une erreur inconnue s'est produite."
			/>
		)
	}

	return <ErrorBoundaryContainer status={404} message="Oups, cette page n'existe pas." />
}
