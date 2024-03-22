import React, { useEffect } from 'react'
import {
	Grid,
	Stack, Typography
} from '@mui/material'
import WeatherCard from './WeatherCard/WeatherCard'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import Loading from '../StateIndicators/Loading'
import { ForecastDay } from '../../types/Weather'
import { useLazyGetThreeDayWeatherForecastQuery, useGetThreeDayWeatherForecastQuery } from '../../api/thirdPartyApis/weatherApi'
import _ from 'lodash'
import { defaultBounds } from '../../utils/constants'

const WeatherThreeDayForecast = () => {
	const dispatch = useDispatch()
	const { threeDayWeatherForecast, isFetching } = useSelector((state: RootState) => state.weather)
	const { coords, bounds } = useSelector((state: RootState) => state.maps)
	const [getThreeDayForecast] = useLazyGetThreeDayWeatherForecastQuery();

	useEffect(() => {
		async function getForecast() {
			if (!_.isEqual(bounds, defaultBounds)) {
				await getThreeDayForecast(coords)
			}
		}
		getForecast()
	}, [bounds, getThreeDayForecast])

	return (
		<Stack sx={styles.container}>
			{/* If component is loading, display loading indicator */}
			{isFetching ? (
				<Loading />
			) : (
				// If component is not loading, display the form and the list of airbnbs
				<Stack>
					<Typography variant="h5" sx={styles.forecastHeader}>
						{threeDayWeatherForecast?.location?.name} Forecast
					</Typography>
					<Grid container spacing={3} sx={styles.weatherForecast}>
						{threeDayWeatherForecast?.forecast.forecastday.map((forecastDay: ForecastDay, index: number) => (
							<Grid item key={index}>
								<WeatherCard forecastDay={forecastDay} />
							</Grid>
						))}
					</Grid>
				</Stack>
			)}
		</Stack>
	)
}

export default WeatherThreeDayForecast
