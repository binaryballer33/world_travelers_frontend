import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TravelAdvisorApiState } from '../types/State'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'
import { Place } from '../types/Place'

const initialState: TravelAdvisorApiState = {
	rating: '', // use to filter places by rating
	places: [], // used to store the places returned from the travel advisor api
	filteredPlaces: [], // store the filtered places, based on the rating and coords/bounds of the map
	typeOfPlace: 'restaurants', // used to filter places by type of place, restaurants is the default
	placeClicked: null, // used to see which place was clicked
}

const travelAdvisorSlice = createSlice({
	name: 'travelAdvisor',
	initialState: initialState,
	reducers: {
		setRating: (state, action: PayloadAction<string>) => {
			state.rating = action.payload
		},
		setPlaces: (state, action: PayloadAction<Place[]>) => {
			state.places = action.payload
		},
		setFilteredPlaces: (state, action: PayloadAction<Place[]>) => {
			state.filteredPlaces = action.payload
		},
		setTypeOfPlace: (state, action: PayloadAction<string>) => {
			state.typeOfPlace = action.payload
		},
	},
})

export const { setRating, setPlaces, setFilteredPlaces, setTypeOfPlace } =
	travelAdvisorSlice.actions
export default travelAdvisorSlice.reducer
