import { configureStore } from '@reduxjs/toolkit'
import api from '../api/api'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'
import priceLineApi from '../api/thirdPartyApis/priceLineApi.ts'
import weatherApi from '../api/thirdPartyApis/weatherApi'
import airbnbApi from '../api/thirdPartyApis/airbnbApi'
import googleMapsReducer from './googleMapsSlice'
import travelAdvisorReducer from './travelAdvisorSlice'
import pricelineReducer from './pricelineSlice.ts'
import weatherReducer from './weatherSlice'
import airbnbReducer from './airbnbSlice.ts'
import userReducer from './userSlice.ts'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[travelAdvisorApi.reducerPath]: travelAdvisorApi.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		[airbnbApi.reducerPath]: airbnbApi.reducer,
		[priceLineApi.reducerPath]: priceLineApi.reducer,
		maps: googleMapsReducer,
		travelAdvisor: travelAdvisorReducer,
		priceline: pricelineReducer,
		weather: weatherReducer,
		airbnb: airbnbReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			api.middleware,
			travelAdvisorApi.middleware,
			priceLineApi.middleware,
			weatherApi.middleware,
			airbnbApi.middleware,
		]),
})
