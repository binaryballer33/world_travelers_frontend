import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import CreateMapAndPlaces from './components/CreateMapAndPlaces/CreateMapAndPlaces'
import { useState } from 'react'

const App = () => {
	const [coords, setCoords] = useState({})
	const [autocomplete, setAutocomplete] = useState(null)

	const onLoad = (autoC) => setAutocomplete(autoC)

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat()
		const lng = autocomplete.getPlace().geometry.location.lng()
		setCoords({ lat, lng })
	}

	return (
		<>
			<CssBaseline />
			<NavBar onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
			<CreateMapAndPlaces coords={coords} setCoords={setCoords} />
		</>
	)
}

export default App
