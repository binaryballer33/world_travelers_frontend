/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import { getPlacesData, getWeatherData } from '../../api/travelAdvisorAPI'
import Map from '../Map/Map'
import Places from '../Places/Places'

const CreateMapAndPlaces = ({ coords, setCoords }) => {
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')

	// map needs these states to data on the map
	const [bounds, setBounds] = useState(null)
	const [childClicked, setChildClicked] = useState(null)
	const [places, setPlaces] = useState([])
	const [weatherData, setWeatherData] = useState([])

	const [filteredPlaces, setFilteredPlaces] = useState([])

	const [isLoading, setIsLoading] = useState(false)

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

	return (
		<>
			<Map
				setChildClicked={setChildClicked}
				setBounds={setBounds}
				setCoords={setCoords}
				coords={coords}
				places={filteredPlaces.length ? filteredPlaces : places}
				weatherData={weatherData}
			/>
			<Places
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

export default CreateMapAndPlaces
