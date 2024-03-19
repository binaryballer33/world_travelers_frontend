import React, { useEffect } from 'react'
import {
	Grid,
	Stack,
} from '@mui/material'
import WeatherCard from './WeatherCard/WeatherCard'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import Loading from '../StateIndicators/Loading'
import { ForecastDay } from '../../types/Weather'
import { useLazyThreeDayWeatherForecastQuery } from '../../api/thirdPartyApis/weatherApi'
import _ from 'lodash'
import { defaultBounds } from '../../utils/constants'
import { setIsFetchingForecast } from '../../redux/weatherSlice'

const WeatherThreeDayForecast = () => {
	const dispatch = useDispatch()
	const { weather, threeDayWeatherForecast, isFetchingForecast } = useSelector((state: RootState) => state.weather)
	const { coords, bounds } = useSelector((state: RootState) => state.maps)
	const [getThreeDayForecast] = useLazyThreeDayWeatherForecastQuery();

	useEffect(() => {
		async function getForecast() {
			if (!_.isEqual(bounds, defaultBounds)) {
				setIsFetchingForecast(true)
				const response = await getThreeDayForecast(coords)
				console.log({ response });

				setIsFetchingForecast(true)
				console.log({ threeDayWeatherForecast });
			}
		}
		getForecast()
	}, [coords, bounds, dispatch])

	return (
		<Stack sx={styles.container}>
			{/* If component is loading, display loading indicator */}
			{isFetchingForecast ? (
				<Loading />
			) : (
				// If component is not loading, display the form and the list of airbnbs
				<Grid container spacing={3} sx={styles.weatherForecast}>
					{threeDayWeatherForecast?.map((forecastDay: ForecastDay, index: number) => (
						<Grid item key={index}>
							<WeatherCard forecastDay={forecastDay} />
						</Grid>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export default WeatherThreeDayForecast
