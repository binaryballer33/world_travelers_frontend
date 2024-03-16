import React, { useState, useEffect } from 'react'
import { useLazyGetPlacesByMapBoundsQuery } from '../../api/thirdPartyApis/travelAdvisorApi'
import Places from '../Places/Places'
import { Stack } from '@mui/material'
import styles from './styles'
import { Place } from '../../types/Place'
import Map from '../Map/Map'
import { useDispatch, useSelector } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "../../utils/secrets"
import { defaultBounds, libraries } from '../../utils/constants'
import { setLoadError, setIsLoaded } from '../../redux/googleMapsSlice'
import { RootState } from '../../types/State'
import { setPlaces, setRating, setFilteredPlaces } from '../../redux/travelAdvisorSlice'
import _ from 'lodash'

const Home = () => {
	// update the mapsSlice state with the isLoaded and loadError values from the useJsApiLoader hook and trip advisor state
	const dispatch = useDispatch();
	const { places, rating, typeOfPlace } = useSelector((state: RootState) => state.travelAdvisor)
	const { bounds } = useSelector((state: RootState) => state.maps)
	const [childClicked, setChildClicked] = useState(null) // used to show details of a place
	const [getPlacesByMapBounds, { isFetching }] = useLazyGetPlacesByMapBoundsQuery() // query used to get places by map bounds

	// filter places by rating
	useEffect(() => {
		const filtered = places.filter((place: Place) => Number(place.rating) >= Number(rating))
		dispatch(setFilteredPlaces(filtered))
	}, [rating])

	// call the getPlacesData function when the bounds or type of place state changes
	useEffect(() => {
		// condition used to avoid calling api on default bounds "which is in the middle of the atlantic ocean"
		if (!_.isEqual(bounds, defaultBounds)) {
			async function getPlaces() {
				const response = await getPlacesByMapBounds({ typeOfPlace, bounds })
				const places = response.data.data.filter((place: Place) => place.name && place.num_reviews > 0)

				dispatch(setPlaces(places)) // set the places in the state
				dispatch(setFilteredPlaces([])) // reset the filtered places
				dispatch(setRating('')) // get all the new places, so reset the rating
			}
			getPlaces() // commented out to avoid calling the api too many times, api calls whenever you save file
		}
	}, [bounds, typeOfPlace])

	// get the isLoaded and loadError values from the useJsApiLoader hook, both Navbar and Map components use these values
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
		libraries: libraries,
		mapIds: [GOOGLE_MAP_ID],
	});

	// update the mapsSlice state with the isLoaded and loadError values
	useEffect(() => {
		dispatch(setIsLoaded(isLoaded));
		dispatch(setLoadError(loadError ? loadError.message : null));
	}, [dispatch, isLoaded, loadError]);

	return (
		<Stack sx={styles.homeContainer}>
			{/* Render The Map */}
			<Map setChildClicked={setChildClicked} />

			{/* Render The Places As Cards Below The Map */}
			<Places isFetching={isFetching} childClicked={childClicked} />
		</Stack>
	)
}

export default Home
