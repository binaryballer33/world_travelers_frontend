import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import styles from './styles'
import Map from '../Map/Map'
import { useDispatch } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "../../utils/secrets"
import { libraries } from '../../utils/constants'
import { setLoadError, setIsLoaded } from '../../redux/googleMapsSlice'
import _ from 'lodash'
import AllSearchOptions from './AllSearchOptions'

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

			{/* Render All The Travel Search Options */}
			<AllSearchOptions />
		</Stack>
	)
}

export default Home
