import { Theme, alpha } from '@mui/material'

// theme is passed as an argument to the function when using the sx prop on mui components
const styles = {
	title: {
		display: { xs: 'none', sm: 'block' },
	},
	search: {
		position: 'relative',
		borderRadius: (theme: Theme) => theme.shape.borderRadius,
		backgroundColor: (theme: Theme) =>
			alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: (theme: Theme) =>
				alpha(theme.palette.common.white, 0.25),
		},
		width: { xs: '100%', sm: 'auto' },
	},
	searchIcon: {
		pr: 0,
		pl: 1,
		py: 2,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		pl: (theme: Theme) => `calc(1em + ${theme.spacing(4)})`,
		pr: 1,
		py: 1,
		transition: (theme: Theme) => theme.transitions.create('width'),
		width: { xs: '100%', md: '20ch' },
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	navBarStacks: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	planeLogo: { height: 25, width: 25, marginRight: 8, borderRadius: '50%' },
}

export default styles
