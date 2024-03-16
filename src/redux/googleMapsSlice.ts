import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleMapsApiState } from '../types/State'
import { Bounds } from '../types/LatLng'

const initialState: GoogleMapsApiState = {
	isLoaded: false,
	loadError: null,
	mapBounds: undefined,
}

const googleMapsSlice = createSlice({
	name: 'maps',
	initialState: initialState,
	reducers: {
		setLoaded: (state, action: PayloadAction<boolean>) => {
			state.isLoaded = action.payload
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.loadError = action.payload
		},
		setMapBounds: (state, action: PayloadAction<Bounds | undefined>) => {
			state.mapBounds = action.payload
		},
	},
})

export const { setLoaded, setError, setMapBounds } = googleMapsSlice.actions
export default googleMapsSlice.reducer
