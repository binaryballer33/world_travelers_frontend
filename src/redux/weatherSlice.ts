import { createSlice } from '@reduxjs/toolkit'
import { WeatherApiState } from '../types/State'

const initialState: WeatherApiState = {
	weather: null,
	threeDayWeatherForecast: null,
}

const weatherApiSlice = createSlice({
	name: 'weather',
	initialState: initialState,
	reducers: {
		setWeather: (state, action) => {
			state.weather = action.payload
		},
		setThreeDayForecast: (state, action) => {
			state.threeDayWeatherForecast = action.payload
		},
	},
})

export const { setWeather, setThreeDayForecast } = weatherApiSlice.actions
export default weatherApiSlice.reducer
