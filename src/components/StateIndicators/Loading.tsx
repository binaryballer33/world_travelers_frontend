import React, { Stack, Typography, CircularProgress, BoxProps } from '@mui/material'

interface ILoadingProps extends BoxProps {
	message?: string
	loadingIndicatorSize?: string
}

const Loading = ({ message, loadingIndicatorSize }: ILoadingProps) => (
	<Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
		<Typography variant="h4" color="primary" mb={2}>
			Loading Your {message || 'Data'}
		</Typography>
		<CircularProgress color="primary" size={loadingIndicatorSize || "5rem"} />
	</Stack>
)

export default Loading
