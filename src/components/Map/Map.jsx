/* eslint-disable react/prop-types */
import GoogleMapReact from 'google-map-react'
import {
	Paper,
	Typography,
	useMediaQuery,
	Rating,
	useTheme,
	Box,
} from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
// import mapStyles from '../../mapStyles.js'
import styles from './styles'

const Map = ({
	coords,
	places,
	setCoords,
	setBounds,
	setChildClicked,
	weatherData,
}) => {
	/* Hooks  */
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	/* State */

	return (
		<Box sx={styles.mapContainer}>
			{/* Load The Google Maps */}
			<GoogleMapReact
				bootstrapURLKeys={{
					key: import.meta.env.VITE_GOOGLE_MAPS_API,
					libraries: ['places'],
				}}
				defaultCenter={coords}
				center={coords}
				defaultZoom={14}
				// options={{
				// 	disableDefaultUI: true,
				// 	zoomControl: true,
				// 	// styles: mapStyles,
				// }}
				// onChange={(e) => {
				// 	setCoords({ lat: e.center.lat, lng: e.center.lng })
				// 	setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
				// }}
				// onChildClick={(child) => setChildClicked(child)}
			>
				{/* Put Places On The Map */}
				{/* {places.length &&
					places.map((place, i) => (
						<div
							style={styles.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
						>
							{isMobile ? (
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
							)}
						</div>
					))} */}

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
