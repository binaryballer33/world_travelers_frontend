import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PricelineApiState } from '../types/State'
import { ItineraryData } from '../types/Flights'
import priceLineApi from '../api/thirdPartyApis/priceLineApi'
import { dayAfterTomorrow, tomorrow } from '../utils/constants'

const initialState: PricelineApiState = {
	rating: '',
	data: [], // used to store the data returned from the priceline api
	filteredData: [],
	typeOfData: 'flights',
	dataClicked: null,
	isFetching: false, // used to see if the api is fetching data
	adults: 1,
	departureDate: tomorrow,
	returnDate: dayAfterTomorrow,
	originAirportCode: '',
	destinationAirportCode: '',
	currency: 'USD',
}

const pricelineSlice = createSlice({
	name: 'pricelineApi',
	initialState: initialState,
	reducers: {
		setRating: (state, action: PayloadAction<string>) => {
			state.rating = action.payload
		},
		setFilteredData: (state, action: PayloadAction<ItineraryData[]>) => {
			state.filteredData = action.payload
		},
		setTypeOfData: (state, action: PayloadAction<string>) => {
			state.typeOfData = action.payload
		},
		setIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload
		},
		setAdults: (state, action: PayloadAction<number>) => {
			state.adults = action.payload
		},
		setDepartureDate: (state, action: PayloadAction<string>) => {
			state.departureDate = action.payload
		},
		setReturnDate: (state, action: PayloadAction<string>) => {
			state.returnDate = action.payload
		},
		setOriginAirportCode: (state, action: PayloadAction<string>) => {
			state.originAirportCode = action.payload
		},
		setDestinationAirportCode: (state, action: PayloadAction<string>) => {
			state.destinationAirportCode = action.payload
		},
		setCurrency: (state, action: PayloadAction<string>) => {
			state.currency = action.payload
		},
	},
	extraReducers(builder) {
		builder.addMatcher(
			priceLineApi.endpoints.getRoundTripFlightsPriceline.matchPending,
			(state) => {
				state.isFetching = true
			}
		)

		builder.addMatcher(
			priceLineApi.endpoints.getRoundTripFlightsPriceline.matchFulfilled,
			(state, action) => {
				state.isFetching = false
				state.data =
					action.payload?.getAirFlightRoundTrip.results?.result?.itinerary_data
			}
		)

		builder.addMatcher(
			priceLineApi.endpoints.getRoundTripFlightsPriceline.matchRejected,
			(state) => {
				state.isFetching = false
				state.data = []
			}
		)
	},
})

export const {
	setRating,
	setFilteredData,
	setTypeOfData,
	setIsFetching,
	setAdults,
	setDepartureDate,
	setReturnDate,
	setOriginAirportCode,
	setDestinationAirportCode,
	setCurrency,
} = pricelineSlice.actions
export default pricelineSlice.reducer
