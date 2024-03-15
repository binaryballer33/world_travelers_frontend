import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'

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
