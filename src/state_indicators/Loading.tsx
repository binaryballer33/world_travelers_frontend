import React, { Stack, Typography, CircularProgress, BoxProps } from '@mui/material'

const Loading = ({ }: BoxProps) => (
	<Stack alignItems="center" justifyContent="center" sx={{ height: '80vh' }}>
		<Typography variant="h4" color="primary">
			Loading
		</Typography>
		<CircularProgress color="primary" size="5em" />
	</Stack>
)

export default Loading
