import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Cart from './components/Cart/Cart'
import PopularTrips from './components/PopularTrips/PopularTrips'
import Logout from './components/Auth/Logout/Logout'
import Trips from './components/Trips/Trips'
import Profile from './components/Auth/Profile/Profile'

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/trips" element={<Trips />} />
				<Route path="/populartrips" element={<PopularTrips />} />
			</Routes>
		</Router>
	)
}

export default App
