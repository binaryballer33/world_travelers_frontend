import { createSlice } from '@reduxjs/toolkit'
import { WeatherApiState } from '../types/State'
import weatherApi from '../api/thirdPartyApis/weatherApi'

const initialState: WeatherApiState = {
	weather: null,
	threeDayWeatherForecast: null,
}

const weatherApiSlice = createSlice({
	name: 'weather',
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(
			weatherApi.endpoints.getCurrentWeather.matchFulfilled,
			(state, action) => {
				state.weather = action.payload
			}
		)
		builder.addMatcher(
			weatherApi.endpoints.threeDayWeatherForecast.matchFulfilled,
			(state, action) => {
				state.threeDayWeatherForecast = action.payload
			}
		)
	},
})

export default weatherApiSlice.reducer
