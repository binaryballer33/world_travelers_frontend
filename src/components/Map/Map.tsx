import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import {
	Paper,
	Typography,
	useMediaQuery,
	Rating,
	useTheme,
	Box,
} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import styles from './styles'
import { Star } from '@mui/icons-material'
import { GOOGLE_MAPS_API_KEY } from '../../utils/secrets'
import { Place } from '../../types/Place'

const Map = ({
	coords,
	places,
	setCoords,
	setBounds,
	setChildClicked,
	weatherData,
}) => {
	/* State */
	// get the default coords from the coords and don't change on rerender

	/* Hooks  */
	// const theme = useTheme()
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
	const [initialCoords, setInitialCoords] = useState<GeolocationCoordinates | null>(currentLocation)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCurrentLocation(position.coords);
			},
			(error) => {
				console.error("Error Code = " + error.code + " - " + error.message);
			}
		);
	}, [setCurrentLocation]);

	// don't change my default coords again once they are set the first time
	useEffect(() => {
		if (currentLocation && !initialCoords) {
			setInitialCoords(currentLocation);
		}
	}, [currentLocation]);

	console.log({ currentLocation, initialCoords });


	// get user's location and set the coords state equal to the user's location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			// destructure latitude and longitude from the position.coords
			({ coords: { latitude, longitude } }) => {
				setCoords({ lat: latitude, lng: longitude })
			}
		)
	}, [setCoords])

	return (
		<Box sx={styles.mapContainer}>
			{/* Load The Google Maps */}
			<GoogleMapReact
				bootstrapURLKeys={{
					key: GOOGLE_MAPS_API_KEY,
					libraries: ['places'],
				}}
				defaultCenter={initialCoords}
				center={coords}
				defaultZoom={14}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
				}}
				onChange={(e) => {
					setCoords({ lat: e.center.lat, lng: e.center.lng })
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
				}}
				onChildClick={(child) => setChildClicked(child)}
			>
				{/* Put Places On The Map */}
				{places.length &&
					places.map((place: Place, index: number) => (
						// put a marker on the map for each place
						<Box
							sx={styles.markerContainer}
							key={index}
						>
							{/* <Marker
								key={index}
								position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
							/> */}
							<LocationOnOutlinedIcon
								color="primary"
								fontSize="large"
							/>

							{/* {isMobile ? (
								<LocationOnOutlinedIcon
									color="primary"
									fontSize="large"
								/>
							) : (
								<Paper elevation={3} sx={styles.paper}>
									<Typography
										sx={styles.typography}
										variant="subtitle2"
										gutterBottom
									>
										{' '}
										{place.name}
									</Typography>
									<img
										style={styles.pointer}
										src={
											place.photo
												? place.photo.images.large.url
												: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
										}
									/>
									<Rating
										name="read-only"
										size="small"
										value={Number(place.rating)}
										readOnly
									/>
								</Paper>
							)} */}
						</Box>
					))}

				{/* Put Weather Data On The Map */}
				{/* {weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="70px"
							/>
						</div>
					))} */}
			</GoogleMapReact>
		</Box>
	)
}

export default Map
