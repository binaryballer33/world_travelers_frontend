import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RAPID_API_KEY } from '../../utils/secrets'
import {
	PRICE_LINE_BASE_URL,
	PRICE_LINE_HOST_DOMAIN,
	tomorrow,
	dayAfterTomorrow,
	getRoundTripFlightsPricelineRoute,
} from '../../utils/constants'
import { FlightResponse } from '../../types/Flights'

type FlightQueryObject = {
	adults: number
	departureDate: string // format "YYYY-MM-DD"
	returnDate: string // format "YYYY-MM-DD"
	originAirportCode: string // format "TPA,MIA"
	destinationAirportCode: string // format "MIA,TPA"
	currency: string
}

const priceLineApi = createApi({
	reducerPath: 'priceLineApi',
	baseQuery: fetchBaseQuery({
		baseUrl: PRICE_LINE_BASE_URL,
	}),
	endpoints: (builder) => ({
		getRoundTripFlightsPriceline: builder.query<
			FlightResponse,
			FlightQueryObject
		>({
			// data arrived in THIS FORMAT
			// data:
			//   getAirFlightRoundTrip:
			//     results:
			//       result
			query: (flightInfo) => ({
				url: getRoundTripFlightsPricelineRoute(),
				params: {
					adults: flightInfo.adults || 1,
					sid: 'iSiX639',
					// format "YYYY-MM-DD,YYYY-MM-DD"
					departure_date:
						`${flightInfo.departureDate},${flightInfo.returnDate}` ||
						`${tomorrow},${dayAfterTomorrow}`,
					origin_airport_code: `${flightInfo.originAirportCode},${flightInfo.destinationAirportCode}`,
					destination_airport_code: `${flightInfo.destinationAirportCode},${flightInfo.originAirportCode}`,
					currency: flightInfo.currency || 'USD',
				},
				headers: {
					'x-rapidapi-key': RAPID_API_KEY,
					'x-rapidapi-host': PRICE_LINE_HOST_DOMAIN,
				},
			}),
		}),
	}),
})

export const {
	useGetRoundTripFlightsPricelineQuery,
	useLazyGetRoundTripFlightsPricelineQuery,
} = priceLineApi

export default priceLineApi
