import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RAPID_API_KEY } from '../../utils/secrets'
import { Bounds } from '../../types/LatLng'
import {
	PRICE_LINE_BASE_URL,
	PRICE_LINE_HOST_DOMAIN,
	dayAfterTomorrow,
	getRoundTripFlightsPricelineRoute,
	tomorrow,
} from '../../utils/constants'
import { Place } from '../../types/Place'

type FlightInfo = {
	adults: number
	sid: string
	departure_date: string // format "YYYY-MM-DD"
	return_date: string // format "YYYY-MM-DD"
	origin_airport_code: string // format "TPA,MIA"
	destination_airport_code: string // format "MIA,TPA"
	currency: string
}

const priceLineApi = createApi({
	reducerPath: 'priceLineApi',
	baseQuery: fetchBaseQuery({
		baseUrl: PRICE_LINE_BASE_URL,
	}),
	endpoints: (builder) => ({
		getRoundTripFlightsPriceline: builder.query<Place[], FlightInfo>({
			query: (flightInfo) => ({
				url: getRoundTripFlightsPricelineRoute(),
				params: {
					adults: flightInfo.adults || 1,
					sid: 'iSiX639',
					// format "YYYY-MM-DD,YYYY-MM-DD"
					departure_date:
						`${flightInfo.departure_date},${flightInfo.return_date}` ||
						`${tomorrow},${dayAfterTomorrow}`,
					origin_airport_code: flightInfo.origin_airport_code,
					destination_airport_code:
						flightInfo.destination_airport_code,
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
