import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleMapsApiState } from '../types/State'
import { Bounds } from '../types/LatLng'

const initialState: GoogleMapsApiState = {
	isLoaded: false,
	loadError: null,
	coords: { lat: 0, lng: 0 },
	bounds: { ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } }, // middle of the atlantic ocean,
}

const googleMapsSlice = createSlice({
	name: 'maps',
	initialState: initialState,
	reducers: {
		setIsLoaded: (state, action: PayloadAction<boolean>) => {
			state.isLoaded = action.payload
		},
		setLoadError: (state, action: PayloadAction<string | null>) => {
			state.loadError = action.payload
		},
		setCoords: (
			state,
			action: PayloadAction<google.maps.LatLngLiteral>
		) => {
			state.coords = action.payload
		},
		setBounds: (state, action: PayloadAction<Bounds>) => {
			state.bounds = action.payload
		},
	},
})

export const { setLoadError, setIsLoaded, setCoords, setBounds } =
	googleMapsSlice.actions
export default googleMapsSlice.reducer
