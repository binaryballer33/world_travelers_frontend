import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RAPID_API_KEY } from '../../utils/secrets'
import { Bounds } from '../../types/LatLng'
import {
	TRIP_ADVISOR_BASE_URL,
	getPlacesByMapBoundsRoute,
} from '../../utils/constants'

interface GetPlacesByMapBoundsArgs {
	typeOfPlace: string
	bounds: Bounds
}

const travelAdvisorApi = createApi({
	reducerPath: 'travelAdvisorApi',
	baseQuery: fetchBaseQuery({
		baseUrl: TRIP_ADVISOR_BASE_URL,
	}),
	endpoints: (builder) => ({
		getPlacesByMapBounds: builder.query<any, GetPlacesByMapBoundsArgs>({
			query: ({ typeOfPlace, bounds }) => ({
				url: getPlacesByMapBoundsRoute(typeOfPlace),
				params: {
					bl_latitude: bounds.sw.lat,
					bl_longitude: bounds.sw.lng,
					tr_longitude: bounds.ne.lng,
					tr_latitude: bounds.ne.lat,
					limit: '30',
					currency: 'USD',
					lunit: 'mi',
				},
				headers: {
					'x-rapidapi-key': RAPID_API_KEY,
					'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				},
			}),
		}),
	}),
})

export const {
	useGetPlacesByMapBoundsQuery,
	useLazyGetPlacesByMapBoundsQuery,
} = travelAdvisorApi

export default travelAdvisorApi
