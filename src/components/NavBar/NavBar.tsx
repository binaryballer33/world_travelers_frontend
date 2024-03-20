import React, { SyntheticEvent, useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box, Stack, useMediaQuery, useTheme, MenuItem, Menu, IconButton, Button, Divider, Tooltip, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete } from '@react-google-maps/api'
import getCityCoordinates from '../../utils/helperFunctions/getCityCoordinates'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import { setCoords } from '../../redux/googleMapsSlice'
import { useLazyGetCurrentWeatherQuery } from '../../api/thirdPartyApis/weatherApi'
import { USER, defaultBounds, planeLogoImageUrl } from '../../utils/constants'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const NavBar = () => {
	const dispatch = useDispatch()
	const { isLoaded, coords, bounds } = useSelector((state: RootState) => state.maps)
	const { weather } = useSelector((state: RootState) => state.weather)
	const weatherText = weather ? `${weather?.current?.temp_f}°F / ${weather?.current?.temp_c}°C` : ""
	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null) // state to hold the Autocomplete object
	const [getCurrentWeather] = useLazyGetCurrentWeatherQuery()  // get the current weather

	useEffect(() => {
		if (!_.isEqual(bounds, defaultBounds)) getCurrentWeather(coords)
	}, [bounds, getCurrentWeather]);

	// When the Autocomplete component is loaded, set the autocomplete object
	const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC)

	/* When the user selects a place in the search box, set the coords to that place */
	const onPlaceChanged = () => {
		const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
		const lng = autocomplete?.getPlace()?.geometry?.location?.lng();
		if (lat && lng) dispatch(setCoords({ lat, lng }));
	};

	// get the autocomplete place or if it's empty, use the value
	const getCityCoords = async () => {
		const city_name = autocomplete?.getPlace()?.formatted_address!
		const cityCoords = await getCityCoordinates(city_name)
		if (cityCoords) dispatch(setCoords(cityCoords!));
	}

	// get the user credentials from the session storage
	const { token, user } = JSON.parse(
		window.sessionStorage.getItem(USER)!
	) || { token: '', user: {} }

	// modify the theme based on the screen size
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	// links and account options
	const pages = ['Popular Trips']
	// show the correct options based on the user's login status
	const settings = token
		? ['Cart', 'Trips', 'Profile', 'Log Out']
		: ['Cart', 'Log In', 'Register']

	// state variables opening and closing menus in the nav bar
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)

	// handlers for opening and closing menus in the nav bar
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	return (
		<AppBar position="static">
			<Toolbar sx={styles.toolbar}>
				{/* When the screen size is small, change the look of the NavBar */}
				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>

					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
						{pages.map((page) => (
							<MenuItem
								key={page}
								onClick={handleCloseNavMenu}
							>
								<Typography
									component={Link}
									to={`/${page
										.replace(' ', '')
										.toLowerCase()}`}
									sx={{
										my: 2,
										color: 'primary.main',
										display: 'block',
										textDecoration: 'none',
										textAlign: 'center',
									}}
								>
									{page}
								</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>

				{/* Render the current weather */}
				<Stack sx={styles.navBarStacks}>
					<Button component={Link} to="/" sx={{ p: 0, minWidth: 20 }} size="small">
						<img src={planeLogoImageUrl} style={styles.planeLogo} />
					</Button>
					<Typography variant="h6" sx={styles.title}>
						World Travelers {weather ? weatherText : ""}
					</Typography>
				</Stack>

				{/* create the NavBar links in the pages array */}
				<Box
					sx={{
						flexGrow: 1,
						display: { xs: 'none', md: 'flex' },
						justifyContent: 'end',
						mr: 2,
					}}
				>
					{pages.map((page) => (
						<Button
							key={page}
							onClick={handleCloseNavMenu}
							component={Link}
							to={`/${page.replace(' ', '').toLowerCase()}`}
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								textDecoration: 'none',
							}}
						>
							{page}
						</Button>
					))}
				</Box>

				{/* Google Maps Autocomplete Search Box */}
				<Stack sx={styles.navBarStacks}>
					{/* Render the Autocomplete component For Google Maps Searches */}
					{isLoaded && (<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
					>
						<Box sx={styles.search}>
							<Box sx={styles.searchIcon}><SearchIcon /></Box>
							<InputBase
								onKeyDown={(e) => { if (e.key === 'Enter') getCityCoords() }}
								placeholder={isMobile ? `${weatherText}` : "Enter Your Destination"}
								sx={{ root: styles.inputRoot, input: styles.inputInput }}
							/>
						</Box>
					</Autocomplete>)}
				</Stack>

				<Box sx={{ ml: 1 }}>
					<Tooltip title="Open settings">
						<IconButton
							onClick={handleOpenUserMenu}
							sx={{ p: 0 }}
						>
							<Avatar>
								<PersonIcon
									sx={{ color: 'primary.dark' }}
								/>
							</Avatar>
						</IconButton>
					</Tooltip>

					<Menu
						sx={{ mt: '45px' }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{/* Renders User's Name If They Are Logged In */}
						{token && user && (
							<Box>
								<Typography
									variant="body1"
									color="primary.main"
									textAlign="center"
								>
									Hi {user.firstName}
								</Typography>
								<Divider
									sx={{
										mt: 1,
										mb: 1,
										borderColor: 'primary.dark',
									}}
								/>
							</Box>
						)}
						{/* Only Return MenuItems That Make Sense For The Situation */}
						{settings.map((setting) => {
							return (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
									<Typography
										textAlign="center"
										component={Link}
										to={`/${setting
											.replace(' ', '')
											.toLowerCase()}`}
										sx={{
											textDecoration: 'none',
											color: 'inherit',
										}}
									>
										{setting}
									</Typography>
								</MenuItem>
							)
						})}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
