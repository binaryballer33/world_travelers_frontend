import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import { Bounds } from './types/LatLng'

const App = () => {
	const [bounds, setBounds] = useState<Bounds>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } });

	return (
		<Router>
			<CssBaseline />
			<NavBar setBounds={setBounds} />
			<Routes>
				<Route index element={<Home bounds={bounds} setBounds={setBounds} />} />
			</Routes>
		</Router>
	)
}

export default App
