import React, { Snackbar, Alert } from '@mui/material'
import { SyntheticEvent, useState } from 'react'

type PopupIndicatorProp = {
	message: string,
	timeout: number,
}

/* Will be used for saving trips, logging in, registering, ect */
const PopupIndicator = ({ message, timeout }: PopupIndicatorProp) => {
	// state to control the snackbar
	const [open, setOpen] = useState(true)

	// function to close the snackbar
	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={timeout || 2000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}

export default PopupIndicator
