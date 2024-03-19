import { createSlice } from '@reduxjs/toolkit'
import { WeatherApiState } from '../types/State'
import weatherApi from '../api/thirdPartyApis/weatherApi'

const initialState: WeatherApiState = {
	weather: null,
	threeDayWeatherForecast: [],
	isFetchingForecast: false,
}

const weatherApiSlice = createSlice({
	name: 'weather',
	initialState: initialState,
	reducers: {
		setIsFetchingForecast: (state, action) => {
			state.isFetchingForecast = action.payload
		},
	},
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
				state.threeDayWeatherForecast =
					action.payload.forecast.forecastday
			}
		)
	},
})

export const { setIsFetchingForecast } = weatherApiSlice.actions
export default weatherApiSlice.reducer
