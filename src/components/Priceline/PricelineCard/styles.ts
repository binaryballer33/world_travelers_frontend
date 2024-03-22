const styles = {
	cardContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: { xs: 320, sm: 400 },
		height: 800,
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
	chip: {
		ml: 0,
		mr: '5px',
		my: '5px',
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
}

export default styles
