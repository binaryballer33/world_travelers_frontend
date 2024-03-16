import React, { useState, useEffect } from 'react'
import getPlacesByMapBounds from '../../api/thirdPartyApis/travelAdvisorAPI'
import getWeatherData from '../../api/thirdPartyApis/openWeatherApi'
import Places from '../Places/Places'
import { Stack } from '@mui/material'
import styles from './styles'
import { Place } from '../../types/Place'
import { Bounds } from '../../types/LatLng'
import Map from '../Map/Map'
import { useDispatch } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "../../utils/secrets"
import { libraries } from '../../utils/constants'
import { setError, setLoaded } from '../../redux/googleMapsSlice'

type HomeProps = {
	coords: google.maps.LatLngLiteral
	setCoords: (coords: google.maps.LatLngLiteral) => void;
	bounds: Bounds;
	setBounds: (bounds: Bounds) => void;
}

const Home = ({ coords, setCoords, bounds, setBounds }: HomeProps) => {
	/* State Values  */
	const [type, setType] = useState('restaurants') // used to filter by type of place
	const [rating, setRating] = useState('') // use to filter places by rating
	// used to filter places by location, returns more data than just using lat & lon from the travel advisor api
	const [places, setPlaces] = useState<Place[]>([]) // used to store the places
	const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]) // used to store the filtered places
	const [childClicked, setChildClicked] = useState(null) // used to show details of a place
	const [weatherData, setWeatherData] = useState([]) // used to store the weather data
	const [isLoading, setIsLoading] = useState(false) // used to show a loading spinner

	// filter places by rating
	useEffect(() => {
		const filtered = places.filter((place: Place) => Number(place.rating) > Number(rating))
		setFilteredPlaces(filtered)
	}, [rating])

	// call the getPlacesData and getWeatherData functions when the bounds or type of place state changes
	useEffect(() => {
		if (bounds) {
			setIsLoading(true)

			// getWeatherData(coords.lat, coords.lng).then((data) =>
			// 	setWeatherData(data)
			// )

			getPlacesByMapBounds(type, bounds)
				.then((data) => {
					setPlaces(
						data.filter((place: Place) => place.name && place.num_reviews > 0)
					)
					setFilteredPlaces([])
					setRating('')
					setIsLoading(false)
				})
		}
	}, [bounds, type])

	// update the mapsSlice state with the isLoaded and loadError values from the useJsApiLoader hook
	const dispatch = useDispatch();

	// get the isLoaded and loadError values from the useJsApiLoader hook, both Navbar and Map components use these values
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
		libraries: libraries,
		mapIds: [GOOGLE_MAP_ID],
	});

	// update the mapsSlice state with the isLoaded and loadError values
	useEffect(() => {
		dispatch(setLoaded(isLoaded));
		dispatch(setError(loadError ? loadError.message : null));
	}, [dispatch, isLoaded, loadError]);

	return (
		<Stack sx={styles.homeContainer}>
			{/* Render The Map */}
			<Map
				coords={coords}
				places={filteredPlaces.length ? filteredPlaces : places}
				weatherData={weatherData}
				setChildClicked={setChildClicked}
				setCoords={setCoords}
				setBounds={setBounds}
			/>

			{/* Render The Places As Cards Below The Map */}
			<Places
				isLoading={isLoading}
				childClicked={childClicked}
				places={filteredPlaces.length ? filteredPlaces : places}
				type={type}
				setType={setType}
				rating={rating}
				setRating={setRating}
			/>
		</Stack>
	)
}

export default Home
