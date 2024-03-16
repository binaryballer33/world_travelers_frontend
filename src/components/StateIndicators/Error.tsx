import { Stack, Typography } from '@mui/material'
import { Exception } from '../../types/Error'

type ErrorProps = {
	error: Exception
	height: number
}

const Error = ({ error, height }: ErrorProps) => (
	<Stack
		alignItems="center"
		justifyContent="center"
		height={height || '80vh'}
		textAlign="center"
	>
		<Typography variant="h4" color="red" mb={2}>
			Error Status: {error.status}
		</Typography>
		<Typography variant="h4" color="red">
			Error Message: {error.message}
		</Typography>
	</Stack>
)

export default Error
