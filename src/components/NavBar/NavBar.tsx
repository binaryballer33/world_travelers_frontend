import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete } from '@react-google-maps/api'
import getCityCoordinates from '../../utils/helperFunctions/getCityCoordinates'
import styles from './styles'
import { LatLng } from '../../types/LatLng'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/State'

type NavBarProps = {
	setCoords: (coords: LatLng | {}) => void
}

const NavBar = ({ setCoords }: NavBarProps) => {
	const { isLoaded } = useSelector((state: RootState) => state.maps)

	// state to hold the Autocomplete object
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

	// When the Autocomplete component is loaded, set the autocomplete object
	const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC)

	/* When the user selects a place in the search box, set the coords to that place */
	const onPlaceChanged = () => {
		const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
		const lng = autocomplete?.getPlace()?.geometry?.location?.lng();
		if (lat && lng) setCoords({ lat, lng });
	};

	const getCityCoords = async () => {
		// get the autocomplete place or if it's empty, use the value
		const city = autocomplete?.getPlace()?.formatted_address!
		const cityCoords = await getCityCoordinates(city)
		if (cityCoords) setCoords(cityCoords)
	}

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

					{/* Render the Autocomplete component For Google Maps Searches */}
					{isLoaded && (<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
					>
						<Box sx={styles.search}>
							<Box sx={styles.searchIcon}>
								<SearchIcon />
							</Box>
							<InputBase
								onKeyDown={(e) => {
									if (e.key === 'Enter') getCityCoords()
								}}
								onBlur={getCityCoords}
								placeholder="Enter Your Destination"
								sx={{
									root: styles.inputRoot,
									input: styles.inputInput,
								}}
							/>
						</Box>
					</Autocomplete>)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
