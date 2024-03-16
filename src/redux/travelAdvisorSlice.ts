import { createSlice } from '@reduxjs/toolkit'
import { TravelAdvisorApiState } from '../types/State'
import travelAdvisorApi from '../api/thirdPartyApis/travelAdvisorApi'

const initialState: TravelAdvisorApiState = {
	rating: 0,
	places: [],
	// filteredPlaces: [],
}

const travelAdvisorSlice = createSlice({
	name: 'travelAdvisor',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			travelAdvisorApi.endpoints.getPlacesByMapBounds.matchFulfilled,
			(state, action) => {
				state.places = action.payload
			}
		)
	},
})

export default travelAdvisorSlice.reducer
