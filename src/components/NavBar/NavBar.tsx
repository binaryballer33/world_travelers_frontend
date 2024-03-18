import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete } from '@react-google-maps/api'
import getCityCoordinates from '../../utils/helperFunctions/getCityCoordinates'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import { setCoords } from '../../redux/googleMapsSlice'
import { useLazyGetCurrentWeatherQuery } from '../../api/thirdPartyApis/weatherApi'
import { defaultBounds } from '../../utils/constants'
import _ from 'lodash'

const NavBar = () => {
	const dispatch = useDispatch()
	const { isLoaded, coords, bounds } = useSelector((state: RootState) => state.maps)
	const { weather } = useSelector((state: RootState) => state.weather)
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null) // state to hold the Autocomplete object
	const [getCurrentWeather] = useLazyGetCurrentWeatherQuery()  // get the current weather

	useEffect(() => {
		if (!_.isEqual(bounds, defaultBounds)) getCurrentWeather(coords)
	}, [bounds, getCurrentWeather]);

	// When the Autocomplete component is loaded, set the autocomplete object
	const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC)

	/* When the user selects a place in the search box, set the coords to that place */
	const onPlaceChanged = () => {
		const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
		const lng = autocomplete?.getPlace()?.geometry?.location?.lng();
		if (lat && lng) dispatch(setCoords({ lat, lng }));
	};

	// get the autocomplete place or if it's empty, use the value
	const getCityCoords = async () => {
		const city_name = autocomplete?.getPlace()?.formatted_address!
		const cityCoords = await getCityCoordinates(city_name)
		if (cityCoords) dispatch(setCoords(cityCoords!));
	}

	return (
		<AppBar position="static">
			<Toolbar sx={styles.toolbar}>
				{/* Render the current weather */}
				<Typography variant="h5" sx={styles.title}>
					World Travelers {weather ? `${weather?.current?.temp_f}°F / ${weather?.current?.temp_c}°C` : ""}
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
							<Box sx={styles.searchIcon}><SearchIcon /></Box>
							<InputBase
								onKeyDown={(e) => { if (e.key === 'Enter') getCityCoords() }}
								placeholder="Enter Your Destination"
								sx={{ root: styles.inputRoot, input: styles.inputInput }}
							/>
						</Box>
					</Autocomplete>)}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
