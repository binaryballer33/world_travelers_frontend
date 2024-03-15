import React, { useState, useEffect } from 'react'
import { getPlacesData, getWeatherData } from '../../api/travelAdvisorAPI'
import Map from '../Map/Map'
import Places from '../Places/Places'
import { Stack } from '@mui/material'
import styles from './styles'
import { Place } from '../../types/Place'
import { Bounds, LatLng } from '../../types/LatLng'
import ReactGoogleMap from '../Map/ReactGoogleMap'

type HomeProps = {
	coords: LatLng | {}
	setCoords: (coords: LatLng) => void
}

const Home = ({ coords, setCoords }: HomeProps) => {
	/* State Values  */
	const [type, setType] = useState('restaurants') // used to filter by type of place
	const [rating, setRating] = useState('') // use to filter places by rating
	const [bounds, setBounds] = useState<Bounds | null>(null) // used to filter places by location
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

			getPlacesData(type, bounds.sw, bounds.ne)
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

	return (
		<Stack sx={styles.homeContainer}>
			{/* Render The Map */}
			{/* <Map
				coords={coords}
				places={filteredPlaces.length ? filteredPlaces : places}
				weatherData={weatherData}
				setChildClicked={setChildClicked}
				setCoords={setCoords}
				setBounds={setBounds}
			/> */}
			<ReactGoogleMap
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
