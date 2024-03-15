import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } from "./utils/secrets"
import { useDispatch } from 'react-redux'
import { libraries } from './utils/constants'
import { setError, setLoaded } from './redux/googleMapsSlice'

const App = () => {
	const [coords, setCoords] = useState({})

	const dispatch = useDispatch();

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: GOOGLE_MAPS_API_KEY,
		libraries: libraries,
		mapIds: [GOOGLE_MAP_ID],
	});

	useEffect(() => {
		dispatch(setLoaded(isLoaded));
		dispatch(setError(loadError ? loadError.message : null));
	}, [dispatch, isLoaded, loadError]);

	return (
		<Router>
			<CssBaseline />
			<NavBar setCoords={setCoords} />
			<Routes>
				<Route
					index
					element={
						<Home
							coords={coords}
							setCoords={setCoords}
						/>
					}
				/>
			</Routes>
		</Router>
	)
}

export default App
