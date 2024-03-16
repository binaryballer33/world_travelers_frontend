import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RAPID_API_KEY } from '../../utils/secrets'
import {
	WEATHER_API_HOST_DOMAIN,
	WEATHER_BASE_URL,
	getCurrentWeatherRoute,
	threeDayWeatherForecastRoute,
} from '../../utils/constants'

const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: WEATHER_BASE_URL,
		prepareHeaders: (headers: Headers) => {
			headers.set('x-rapidapi-key', RAPID_API_KEY)
			headers.set('X-RapidAPI-Host', WEATHER_API_HOST_DOMAIN)
			return headers
		},
	}),
	endpoints: (builder) => ({
		getCurrentWeather: builder.query<any, google.maps.LatLngLiteral>({
			query: (latlng) => ({
				url: getCurrentWeatherRoute(),
				params: {
					q: `${latlng.lat},${latlng.lng}`,
				},
			}),
		}),
		threeDayWeatherForecast: builder.query<any, google.maps.LatLngLiteral>({
			query: (latlng) => ({
				url: threeDayWeatherForecastRoute(),
				params: {
					q: `${latlng.lat},${latlng.lng}`,
					days: '3', // 3 days is the max for the free version
				},
			}),
		}),
	}),
})

export const {
	useThreeDayWeatherForecastQuery,
	useLazyThreeDayWeatherForecastQuery,
	useGetCurrentWeatherQuery,
	useLazyGetCurrentWeatherQuery,
} = weatherApi

export default weatherApi
