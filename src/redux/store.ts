// store.ts
import { configureStore } from '@reduxjs/toolkit'
import googleMapsReducer from './googleMapsSlice'

export const store = configureStore({
	reducer: {
		maps: googleMapsReducer,
	},
})
