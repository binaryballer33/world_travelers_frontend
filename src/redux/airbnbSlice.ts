import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AirbnbApiState } from '../types/State'
import { Airbnb, AirbnbResults } from '../types/Airbnb'
import airbnbApi from '../api/thirdPartyApis/airbnbApi'
import { dayAfterTomorrow, tomorrow } from '../utils/constants'

const initialState: AirbnbApiState = {
	airbnbs: [],
	filteredAirbnbs: [],
	isFetchingAirbnbs: false,
	reviewsCount: 0,
	checkin: tomorrow,
	checkout: dayAfterTomorrow,
	adults: 1,
	children: 0,
	infants: 0,
	pets: 0,
	minPrice: 0,
	maxPrice: 2000,
	currency: 'USD',
}

const airbnbSlice = createSlice({
	name: 'airbnb',
	initialState: initialState,
	reducers: {
		setFilteredAirbnbs: (state, action: PayloadAction<Airbnb[]>) => {
			state.filteredAirbnbs = action.payload
		},
		setIsFetchingAirbnbs: (state, action: PayloadAction<boolean>) => {
			state.isFetchingAirbnbs = action.payload
		},
		setReviewCount: (state, action: PayloadAction<number>) => {
			state.reviewsCount = action.payload
		},
		setCheckin: (state, action: PayloadAction<string>) => {
			state.checkin = action.payload
		},
		setCheckout: (state, action: PayloadAction<string>) => {
			state.checkout = action.payload
		},
		setAdults: (state, action: PayloadAction<number>) => {
			state.adults = action.payload
		},
		setChildren: (state, action: PayloadAction<number>) => {
			state.children = action.payload
		},
		setInfants: (state, action: PayloadAction<number>) => {
			state.infants = action.payload
		},
		setPets: (state, action: PayloadAction<number>) => {
			state.pets = action.payload
		},
		setMinPrice: (state, action: PayloadAction<number>) => {
			state.minPrice = action.payload
		},
		setMaxPrice: (state, action: PayloadAction<number>) => {
			state.maxPrice = action.payload
		},
		setCurrency: (state, action: PayloadAction<string>) => {
			state.currency = action.payload
		},
	},
	extraReducers(builder) {
		builder.addMatcher(
			airbnbApi.endpoints.getAirbnbs.matchPending,
			(state) => {
				state.isFetchingAirbnbs = true
			}
		)

		builder.addMatcher(
			airbnbApi.endpoints.getAirbnbs.matchFulfilled,
			(state, action: PayloadAction<AirbnbResults>) => {
				state.isFetchingAirbnbs = false
				state.airbnbs = action.payload.results
			}
		)

		builder.addMatcher(
			airbnbApi.endpoints.getAirbnbs.matchRejected,
			(state) => {
				state.isFetchingAirbnbs = true
				state.airbnbs = []
			}
		)
	},
})

export const {
	setFilteredAirbnbs,
	setIsFetchingAirbnbs,
	setReviewCount,
	setCheckin,
	setCheckout,
	setAdults,
	setChildren,
	setInfants,
	setPets,
	setMinPrice,
	setMaxPrice,
	setCurrency,
} = airbnbSlice.actions
export default airbnbSlice.reducer
