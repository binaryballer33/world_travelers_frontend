import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GoogleMapsAPIState } from '../types/State'

const initialState: GoogleMapsAPIState = {
	isLoaded: false,
	loadError: null,
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
	},
})

export const { setLoaded, setError } = googleMapsSlice.actions
export default googleMapsSlice.reducer
