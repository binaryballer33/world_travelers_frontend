const styles = {
	cardContainer: {
		width: { xs: 320, sm: 400 },
		height: 'auto',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardMedia: {
		height: 350,
		width: { xs: 320, sm: 400 },
		objectFit: 'fill',
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'center',
	},
	subtitle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '10px',
	},
	spacing: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	hourlyDate: {
		display: 'flex',
		justifyContent: 'space-between',
		overflow: 'scroll',
	},
}

export default styles
