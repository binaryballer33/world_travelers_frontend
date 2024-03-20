const styles = {
	generalInformationContainer: {
		flexDirection: { xs: 'column', md: 'row' },
		justifyContent: 'center',
		alignItems: { xs: 'center', md: 'start' },
		minWidth: '100vw',
		px: 4,
	},
	sideContent: {
		width: { xs: '100%', md: '25%' },
		justifyContent: 'start',
		alignItems: 'center',
	},
	informationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		mt: 2,
		width: { xs: '100%', sm: '80%', md: '100%' },
	},
	informationHeader: {
		flex: 1,
	},
	informationButton: {
		color: 'primary',
		ml: 2,
		width: 120,
		flex: 1,
	},
	mainContent: {
		minWidth: 300,
		width: '75%',
	},
	mainContentItems: {
		minWidth: 300,
	},
	cardContainer: {
		minWidth: 300,
		display: 'flex',
		flexDirection: { xs: 'column', sm: 'row' },
		mb: 2,
	},
	cardMedia: {
		minWidth: 300,
		minHeight: 300,
		objectFit: 'fill',
		flex: { xs: 'none', sm: 1 },
	},
	cardContent: {
		flex: { xs: 'none', sm: 1 },
	},
	header: {
		textAlign: 'center',
		color: 'primary.main',
	},
}

export default styles
