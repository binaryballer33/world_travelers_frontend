import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import { Bounds } from './types/LatLng'
import { defaultBounds } from './utils/constants'

const App = () => {
	const [bounds, setBounds] = useState<Bounds>(defaultBounds);

	return (
		<Router>
			<CssBaseline />
			<NavBar setBounds={setBounds} />
			<Routes>
				<Route index element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
