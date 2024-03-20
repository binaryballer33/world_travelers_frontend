export const formContainerStyles = (
	width: number | string,
	height: number | string
) => ({
	p: 2,
	mt: 2,
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	justifyContent: 'center',
	width: width || { xs: 250, sm: 500, md: 800 },
	height: height || 400,
})

const styles = {
	textfield: {
		width: '90%',
		ml: 'auto',
		mr: 'auto',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: { xs: 'column', md: 'row' },
		placeItems: { xs: 'center', md: 'normal' },
		justifyContent: { md: 'center' },
	},
	formButtons: {
		color: 'primary',
		mb: { xs: 0, md: 2 },
		width: { xs: '90%', md: '45%' },
		':hover': { bgcolor: 'primary.dark' },
	},
	formHeader: {
		textAlign: 'center',
		color: 'primary',
	},
}

export default styles
