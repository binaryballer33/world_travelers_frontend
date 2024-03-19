import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Cart from './components/Cart/Cart'
import PopularTrips from './components/PopularTrips/PopularTrips'

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/register" element={<Register clearFormButton />} />
				<Route path="/login" element={<Login clearFormButton />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/populartrips" element={<PopularTrips />} />
			</Routes>
		</Router>
	)
}

export default App
