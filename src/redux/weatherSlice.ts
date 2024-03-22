import { createSlice } from '@reduxjs/toolkit'
import { WeatherApiState } from '../types/State'
import weatherApi from '../api/thirdPartyApis/weatherApi'

const initialState: WeatherApiState = {
	weather: null,
	threeDayWeatherForecast: null,
	isFetching: false,
}

const weatherApiSlice = createSlice({
	name: 'weather',
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		// matchers for getCurrentWeather
		builder.addMatcher(
			weatherApi.endpoints.getCurrentWeather.matchPending,
			(state) => {
				state.isFetching = true
			}
		)

		builder.addMatcher(
			weatherApi.endpoints.getCurrentWeather.matchFulfilled,
			(state, action) => {
				state.isFetching = false
				state.weather = action.payload
			}
		)

		builder.addMatcher(
			weatherApi.endpoints.getCurrentWeather.matchRejected,
			(state) => {
				state.isFetching = false
				state.weather = null
			}
		)

		// matchers for getThreeDayWeatherForecast
		builder.addMatcher(
			weatherApi.endpoints.getThreeDayWeatherForecast.matchPending,
			(state) => {
				state.isFetching = true
			}
		)

		builder.addMatcher(
			weatherApi.endpoints.getThreeDayWeatherForecast.matchFulfilled,
			(state, action) => {
				state.isFetching = false
				state.threeDayWeatherForecast = action.payload
			}
		)

		builder.addMatcher(
			weatherApi.endpoints.getThreeDayWeatherForecast.matchRejected,
			(state) => {
				state.isFetching = false
				state.threeDayWeatherForecast = null
			}
		)
	},
})

export default weatherApiSlice.reducer
