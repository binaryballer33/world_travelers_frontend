import { configureStore } from '@reduxjs/toolkit'
import api from '../api/api'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'
import weatherApi from '../api/thirdPartyApis/weatherApi'
import googleMapsReducer from './googleMapsSlice'
import travelAdvisorReducer from './travelAdvisorSlice'
import weatherReducer from './weatherSlice'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[travelAdvisorApi.reducerPath]: travelAdvisorApi.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		maps: googleMapsReducer,
		travelAdvisor: travelAdvisorReducer,
		weather: weatherReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			api.middleware,
			travelAdvisorApi.middleware,
			weatherApi.middleware,
		]),
})
