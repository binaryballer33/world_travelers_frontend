import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<NavBar />
			<Routes>
				<Route index element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
