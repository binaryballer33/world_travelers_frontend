import { configureStore } from '@reduxjs/toolkit'
import api from '../api/api'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'
import weatherApi from '../api/thirdPartyApis/weatherApi'
import airbnbApi from '../api/thirdPartyApis/airbnbApi'
import googleMapsReducer from './googleMapsSlice'
import travelAdvisorReducer from './travelAdvisorSlice'
import weatherReducer from './weatherSlice'
import airbnbReducer from './airbnbSlice.ts'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[travelAdvisorApi.reducerPath]: travelAdvisorApi.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		[airbnbApi.reducerPath]: airbnbApi.reducer,
		maps: googleMapsReducer,
		travelAdvisor: travelAdvisorReducer,
		weather: weatherReducer,
		airbnb: airbnbReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			api.middleware,
			travelAdvisorApi.middleware,
			weatherApi.middleware,
			airbnbApi.middleware,
		]),
})
