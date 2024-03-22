const styles = {
	cardContainer: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	airlineBanner: {
		flexDirection: 'row',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		mt: 2,
	},
	connections: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	tripInformationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardMedia: {
		height: 75,
		width: 100,
		objectFit: 'fill',
	},
	cardActions: {
		display: 'flex',
		justifyContent: 'center',
	},
	chip: {
		ml: 0,
		mr: 1,
		my: 1,
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
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	cardContentItem: {
		alignItems: 'center',
	},
	divider: {
		mt: 2,
		mb: 2,
		width: '100%',
		border: 0.5,
	},
}

export default styles
