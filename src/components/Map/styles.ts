const styles = {
	paper: {
		p: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100px',
	},
	mapContainer: {
		height: { xs: 500, sm: 700, md: 1000 },
		width: '100%',
	},
	markerContainer: {
		position: 'absolute',
		transform: 'translate(-50%, -50%)',
		zIndex: 1,
		'&:hover': { zIndex: 2 },
	},
	pointer: {
		cursor: 'pointer',
	},
}

export default styles
