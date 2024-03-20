import React from 'react'
import {
	Box,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Stack,
} from '@mui/material'
import styles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../types/State'
import { ForecastDay } from '../../../types/Weather'

type WeatherCardProps = { forecastDay: ForecastDay }

const WeatherCard = ({ forecastDay }: WeatherCardProps) => {
	const { weather } = useSelector((state: RootState) => state.weather)

	return (
		<Stack>
			<Typography variant="h5" color="primary" textAlign="center">
				Day Weather Forecast
			</Typography>
			<Card elevation={6} sx={styles.cardContainer}>
				<CardMedia
					sx={styles.cardMedia}
					image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzL05NOwNaaWrMmOpNWsYHgEyuwdn_Fm06kVqWp9tgwwK0yu112okt6Cgfww&s"}
					title={weather?.location?.name}
				/>
				<CardContent sx={{ height: "auto" }}>
					{/* forecast date information */}
					<Typography gutterBottom variant="body1" textAlign="center">
						Day: {forecastDay.date}
					</Typography>

					{/* forecast astro information */}
					<Box>
						<Stack flexDirection="row" spacing={2} justifyContent="center">
							<Typography gutterBottom variant="subtitle1" textAlign="center">
								Moon Rise {forecastDay.astro.moonrise}
							</Typography>
							<Typography gutterBottom variant="subtitle1" textAlign="center">
								Moon Phase {forecastDay.astro.moon_phase}
							</Typography>
							<Typography gutterBottom variant="subtitle1" textAlign="center">
								Moon Set {forecastDay.astro.moonset}
							</Typography>
						</Stack>
						<Stack flexDirection="row" spacing={2} justifyContent="center">
							<Typography gutterBottom variant="subtitle1" textAlign="center">
								Sun Rise {forecastDay.astro.sunrise}
							</Typography>
							<Typography gutterBottom variant="subtitle1" textAlign="center">
								Sun Set {forecastDay.astro.sunset}
							</Typography>
						</Stack>
					</Box>

					{/* forecastDay day information */}
					<Stack sx={styles.cardContent}>
						<Stack flexDirection="row" spacing={2} justifyContent="center">
							{/* avg temp */}
							<Typography gutterBottom variant="subtitle1">
								Avg Temp: {forecastDay.day.avgtemp_f}°F / {forecastDay.day.avgtemp_c}°C
							</Typography>
							{/* min temp */}
							<Typography gutterBottom variant="subtitle1">
								Min Temp: {forecastDay.day.mintemp_f}°F / {forecastDay.day.mintemp_c}°C
							</Typography>
							{/* max temp */}
							<Typography gutterBottom variant="subtitle1">
								Max Temp: {forecastDay.day.maxtemp_f}°F / {forecastDay.day.maxtemp_c}°C
							</Typography>
						</Stack>

						{/* chance of rain and snow */}
						<Stack flexDirection="row" spacing={2} justifyContent="center">
							<Typography gutterBottom variant="subtitle1">
								Chain Of Rain {forecastDay.day.daily_chance_of_rain}%
							</Typography>

							<Typography gutterBottom variant="subtitle1">
								Total Rain {forecastDay.day.totalprecip_in} Inches
							</Typography>
						</Stack>
						<Stack flexDirection="row" spacing={2} justifyContent="center">
							<Typography gutterBottom variant="subtitle1">
								Chance Of Snow {forecastDay.day.daily_chance_of_snow}%
							</Typography>
							<Typography gutterBottom variant="subtitle1">
								Total Snow {forecastDay.day.totalsnow_cm / 2.54} Inches
							</Typography>
						</Stack>

						{/* max wind speed */}
						<Typography gutterBottom variant="subtitle1" textAlign="center">
							Max Wind Speed {forecastDay.day.maxwind_mph} MPH / {forecastDay.day.maxwind_kph} KPH
						</Typography>

						{/* avg humidity */}
						<Typography gutterBottom variant="subtitle1" textAlign="center">
							Humidity {forecastDay.day.avghumidity}%
						</Typography>
					</Stack>

					{/* forecastDay hourly information */}
					<Box sx={styles.hourlyDate}>
						{forecastDay.hour.map((hour, index) => (
							<Box key={index}>
								<img src={hour.condition.icon} alt={hour.condition.text} style={{ objectFit: "fill", height: 100, width: 100 }} />
								<Typography gutterBottom variant="subtitle1">
									Hourly Time {hour.time} Hourly Temp {hour.temp_f}°F / {hour.temp_c}°C
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Chance Of Rain {hour.chance_of_rain}%
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Chance Of Snow {hour.chance_of_snow}%
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Cloud {hour.cloud}
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Condition {hour.condition.text}
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Feels Like {hour.feelslike_f}°F / {hour.feelslike_c}°C
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Wind Gust {hour.gust_mph} MPH / {hour.gust_kph} KPH
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Heat Index {hour.heatindex_f}°F / {hour.heatindex_c}°C
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Humidity {hour.humidity}%
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Rain {hour.precip_in} Inches
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Snow {hour.snow_cm / 2.54} Inches
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Wind Stats {hour.wind_degree}° {hour.wind_dir}
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Wind Speed {hour.wind_mph} MPH / {hour.wind_kph} KPH
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									Wind Chill {hour.windchill_f}°F / {hour.windchill_c}°C
								</Typography>
							</Box>
						))}
					</Box>

				</CardContent >
			</Card >
		</Stack>
	)
}

export default WeatherCard
