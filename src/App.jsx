import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import CreateMapAndPlaces from './components/CreateMapAndPlaces/CreateMapAndPlaces'
import { useState } from 'react'

const App = () => {
	const [coords, setCoords] = useState({})

	return (
		<Router>
			<CssBaseline />
			<NavBar setCoords={setCoords} />
			<Routes>
				<Route
					index
					element={
						<CreateMapAndPlaces
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
