import React, { useState, useEffect } from 'react'
import { useGetPlacesByMapBoundsQuery, useLazyGetPlacesByMapBoundsQuery } from '../../api/thirdPartyApis/travelAdvisorApi'
import getWeatherData from '../../api/thirdPartyApis/openWeatherApi'
import Places from '../Places/Places'
import { CircularProgress, Stack } from '@mui/material'
import styles from './styles'
import { Place } from '../../types/Place'
import { Bounds } from '../../types/LatLng'
import Map from '../Map/Map'
import { useDispatch, useSelector } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "../../utils/secrets"
import { libraries } from '../../utils/constants'
import { setError, setLoaded } from '../../redux/googleMapsSlice'
import { RootState, TravelAdvisorApiState } from '../../types/State'
import Loading from '../../state_indicators/Loading'

type HomeProps = {
	coords: google.maps.LatLngLiteral
	setCoords: (coords: google.maps.LatLngLiteral) => void;
	bounds: Bounds;
	setBounds: (bounds: Bounds) => void;
}

const Home = ({ coords, setCoords, bounds, setBounds }: HomeProps) => {
	/* State Values  */
	const [typeOfPlace, setTypeOfPlace] = useState('restaurants') // used to filter by type of place
	const [rating, setRating] = useState('') // use to filter places by rating
	// used to filter places by location, returns more data than just using lat & lon from the travel advisor api
	const [places, setPlaces] = useState<Place[]>([]) // used to store the places
	// const { places } = useSelector((state: RootState) => state.travelAdvisor) // used to store the places

	const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]) // used to store the filtered places
	const [childClicked, setChildClicked] = useState(null) // used to show details of a place
	const [weatherData, setWeatherData] = useState([]) // used to store the weather data
	const [getPlacesByMapBounds, { isLoading }] = useLazyGetPlacesByMapBoundsQuery()

	// filter places by rating
	useEffect(() => {
		const filtered = places.filter((place: Place) => Number(place.rating) > Number(rating))
		setFilteredPlaces(filtered)
	}, [rating])

	// call the getPlacesData and getWeatherData functions when the bounds or type of place state changes
	useEffect(() => {
		if (bounds) {
			if (isLoading) <><Loading /></>
			async function getPlaces() {
				const response = await getPlacesByMapBounds({ typeOfPlace, bounds })
				const places = response.data.data

				setPlaces(places.filter((place: Place) => place.name && place.num_reviews > 0))
				setFilteredPlaces([])
				setRating('')
			}

			// getPlaces() // commented out to avoid calling the api too many times, api calls whenever you save file
		}
	}, [bounds, typeOfPlace])

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
				typeOfPlace={typeOfPlace}
				setTypeOfPlace={setTypeOfPlace}
				rating={rating}
				setRating={setRating}
			/>
		</Stack>
	)
}

export default Home
