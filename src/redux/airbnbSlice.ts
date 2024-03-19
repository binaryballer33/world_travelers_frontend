import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AirbnbApiState } from '../types/State'
import { Airbnb, AirbnbResults } from '../types/Airbnb'
import airbnbApi from '../api/thirdPartyApis/airbnbApi'

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const dayAfterTomorrow = new Date(tomorrow)
dayAfterTomorrow.setDate(tomorrow.getDate() + 1)

const initialState: AirbnbApiState = {
	airbnbs: [],
	filteredAirbnbs: [],
	isFetchingAirbnbs: false,
	reviewsCount: 0,
	checkin: tomorrow.toISOString().split('T')[0], // just get the date information, not the time
	checkout: dayAfterTomorrow.toISOString().split('T')[0], // just get the date information, not the time
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
			airbnbApi.endpoints.getAirbnbs.matchFulfilled,
			(state, action: PayloadAction<AirbnbResults>) => {
				state.airbnbs = action.payload.results

				// state.airbnbs = action.payload.results .filter(
				// 	(airbnb) =>
				// 		airbnb.price.rate >= state.minPrice &&
				// 		airbnb.price.rate <= state.maxPrice
				// )
				console.log(state.airbnbs)
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
