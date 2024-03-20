import React, { BoxProps, Stack, Typography } from '@mui/material'
import { Exception } from '../../types/Error'

type ErrorProps = BoxProps & {
	error: Exception | any
	height: number | string
}

const Error = ({ error, width, height }: ErrorProps) => {
	const errorMessage = error?.data?.message || error?.message || 'An error occurred'
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			width={width || '50%'}
			height={height || 'auto'}
			textAlign="center"
			mt={2}
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
