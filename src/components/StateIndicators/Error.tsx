import React, { Stack, Typography } from '@mui/material'
import { Exception } from '../../types/Error'

type ErrorProps = {
	error: Exception | any
	height: number | string
}

const Error = ({ error, height }: ErrorProps) => {
	const errorMessage = error?.data?.message || error?.message || 'An error occurred'
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			height={height || '80vh'}
			textAlign="center"
		>
			<Typography variant="h4" color="red" mb={2}>
				Error Status: {error?.status}
			</Typography>
			<Typography variant="h4" color="red">
				Error Message: {errorMessage}
			</Typography>
		</Stack>
	)
}

export default Error
