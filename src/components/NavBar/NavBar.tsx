import React from 'react'
import { Autocomplete, LoadScript } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from './styles.js'

const libraries = ['places']

interface INavBarProps {
	onPlaceChanged: () => {},
	onLoad: () => {},
}

const NavBar = ({ onPlaceChanged, onLoad }: INavBarProps) => {
	return (
		<AppBar position="static">
			<Toolbar sx={styles.toolbar}>
				<Typography variant="h5" sx={styles.title}>
					World Travelers
				</Typography>
				<Box display="flex">
					<Typography variant="h6" sx={styles.title}>
						Where To Next
					</Typography>
					<LoadScript
						googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
						libraries={libraries}
					>
						<Autocomplete
							onLoad={onLoad}
							onPlaceChanged={onPlaceChanged}
						>
							<Box sx={styles.search}>
								<Box sx={styles.searchIcon}>
									<SearchIcon />
								</Box>
								<InputBase
									placeholder="Enter Your Destination"
									sx={{
										root: styles.inputRoot,
										input: styles.inputInput,
									}}
								/>
							</Box>
						</Autocomplete>
					</LoadScript>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
