import React, { useEffect } from 'react'
import TravelAdvisorPlaces from '../TravelAdvisor/TravelAdvisorPlaces'
import { Stack } from '@mui/material'
import styles from './styles'
import Map from '../Map/Map'
import { useDispatch } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "../../utils/secrets"
import { libraries } from '../../utils/constants'
import { setLoadError, setIsLoaded } from '../../redux/googleMapsSlice'
import _ from 'lodash'
import TravelAdvisorSearchOptions from '../TravelAdvisor/TravelAdvisorSearchOptions/TravelAdvisorSearchOptions'
import AirbnbSearchOptions from '../Airbnb/AirbnbSearchOptions/AirbnbSearchOptions'
import Airbnbs from '../Airbnb/Airbnbs'

const Home = () => {
	// update the mapsSlice state with the isLoaded and loadError values from the useJsApiLoader hook and trip advisor state
	const dispatch = useDispatch();

	// get the isLoaded and loadError values from the useJsApiLoader hook, both Navbar and Map components use these values
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
		libraries: libraries,
		mapIds: GOOGLE_MAP_ID,
	});

	// update the mapsSlice state with the isLoaded and loadError values
	useEffect(() => {
		dispatch(setIsLoaded(isLoaded));
		dispatch(setLoadError(loadError ? loadError.message : null));
	}, [dispatch, isLoaded, loadError]);

	return (
		<Stack sx={styles.homeContainer}>
			{/* Render The Map */}
			<Map />

			{/* Render The Airbnb Search Options */}
			<AirbnbSearchOptions />
			{/* Render The Airbnbs As Cards Below The Map */}
			<Airbnbs />

			{/* Render The Place Search Options */}
			<TravelAdvisorSearchOptions />
			{/* Render The Places As Cards Below The Map */}
			<TravelAdvisorPlaces />
		</Stack>
	)
}

export default Home
