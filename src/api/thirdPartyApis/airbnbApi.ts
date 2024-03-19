import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RAPID_API_KEY } from '../../utils/secrets'
import { Bounds } from '../../types/LatLng'
import {
	AIRBNB_BASE_URL,
	AIRBNB_HOST_DOMAIN,
	getAirbnbsRoute,
} from '../../utils/constants'
import { AirbnbResults } from '../../types/Airbnb'

interface AirbnbConfig {
	bounds: Bounds
	checkin: string
	checkout: string
	adults: number
	children: number
	infants: number
	pets: number
	currency: string
}

const airbnbApi = createApi({
	reducerPath: 'airbnbApi',
	baseQuery: fetchBaseQuery({ baseUrl: AIRBNB_BASE_URL }),
	endpoints: (builder) => ({
		getAirbnbs: builder.query<AirbnbResults, AirbnbConfig>({
			query: (airbnb) => ({
				url: getAirbnbsRoute(),
				params: {
					ne_lat: airbnb.bounds.ne.lat,
					ne_lng: airbnb.bounds.ne.lng,
					sw_lat: airbnb.bounds.sw.lat,
					sw_lng: airbnb.bounds.sw.lng,
					checkin: airbnb.checkin,
					checkout: airbnb.checkout,
					adults: airbnb.adults,
					children: airbnb.children,
					infants: airbnb.infants,
					pets: airbnb.pets,
					page: '1',
					currency: 'USD',
				},
				headers: {
					'X-RapidAPI-Key': RAPID_API_KEY,
					'X-RapidAPI-Host': AIRBNB_HOST_DOMAIN,
				},
			}),
		}),
	}),
})

export const { useGetAirbnbsQuery, useLazyGetAirbnbsQuery } = airbnbApi

export default airbnbApi
