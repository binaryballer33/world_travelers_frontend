import { useState, useEffect } from 'react'
import { CssBaseline } from '@mui/material'

import { getPlacesData, getWeatherData } from './api/travelAdvisorAPI'
import NavBar from './components/NavBar/NavBar'
import Map from './components/Map/Map'
import List from './components/List/List'

const App = () => {
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')

	// map needs these states to data on the map
	const [coords, setCoords] = useState({})
	const [bounds, setBounds] = useState(null)
	const [childClicked, setChildClicked] = useState(null)
	const [places, setPlaces] = useState([])
	const [weatherData, setWeatherData] = useState([])

	const [filteredPlaces, setFilteredPlaces] = useState([])

	const [autocomplete, setAutocomplete] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	// get user's location and set the coords state equal to the user's location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			// destructure latitude and longitude from the position.coords
			({ coords: { latitude, longitude } }) => {
				setCoords({ lat: latitude, lng: longitude })
			}
		)
	}, [])

	// filter places by rating
	useEffect(() => {
		const filtered = places.filter((place) => Number(place.rating) > rating)
		setFilteredPlaces(filtered)
	}, [rating])

	// call the getPlacesData and getWeatherData functions when the bounds or type of place state changes
	useEffect(() => {
		if (bounds) {
			setIsLoading(true)

			// getWeatherData(coords.lat, coords.lng).then((data) =>
			// 	setWeatherData(data)
			// )

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(
					data.filter((place) => place.name && place.num_reviews > 0)
				)
				setFilteredPlaces([])
				setRating('')
				setIsLoading(false)
			})
		}
	}, [bounds, type])

	const onLoad = (autoC) => setAutocomplete(autoC)

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat()
		const lng = autocomplete.getPlace().geometry.location.lng()
		setCoords({ lat, lng })
	}

	return (
		<>
			<CssBaseline />
			<NavBar onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
			<Map
				setChildClicked={setChildClicked}
				setBounds={setBounds}
				setCoords={setCoords}
				coords={coords}
				places={filteredPlaces.length ? filteredPlaces : places}
				weatherData={weatherData}
			/>
			<List
				isLoading={isLoading}
				childClicked={childClicked}
				places={filteredPlaces.length ? filteredPlaces : places}
				type={type}
				setType={setType}
				rating={rating}
				setRating={setRating}
			/>
		</>
	)
}

export default App
