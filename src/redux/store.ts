import { configureStore } from '@reduxjs/toolkit'
import googleMapsReducer from './googleMapsSlice'
import travelAdvisorReducer from './travelAdvisorSlice'
import api from '../api/api'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[travelAdvisorApi.reducerPath]: travelAdvisorApi.reducer,
		maps: googleMapsReducer,
		travelAdvisor: travelAdvisorReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			api.middleware,
			travelAdvisorApi.middleware,
		]),
})
