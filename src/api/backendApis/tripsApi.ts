import {
	getTripsByUserIdRoute,
	getCreateTripRoute,
	getUpdateTripRoute,
	getDeleteTripRoute,
} from '../../utils/constants'
import api from '../api'

// product api endpoints
const tripApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getTripsByUserId: builder.query({
			query: () => getTripsByUserIdRoute(),
			providesTags: [{ type: 'Trips', id: 'LIST' }], // add tagTypes to root Api, to provide and invalidate here
		}),
		createTrip: builder.mutation({
			query: (trip) => ({
				url: getCreateTripRoute(),
				method: 'POST',
				body: trip,
			}),
			invalidatesTags: [{ type: 'Trips', id: 'LIST' }],
		}),
		updateTrip: builder.mutation({
			query: (trip) => ({
				url: getUpdateTripRoute(trip.tripId),
				method: 'PUT',
				body: trip.formData,
			}),
			invalidatesTags: [{ type: 'Trips', id: 'LIST' }],
		}),
		deleteTrip: builder.mutation({
			query: (id) => ({
				url: getDeleteTripRoute(id),
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Trips', id: 'LIST' }],
		}),
	}),
})

export default tripApi

export const {
	useCreateTripMutation,
	useDeleteTripMutation,
	useGetTripsByUserIdQuery,
	useUpdateTripMutation,
	useLazyGetTripsByUserIdQuery,
} = tripApi
