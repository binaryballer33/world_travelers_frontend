import {
	getUserRegisterRoute,
	getUserLoginRoute,
	getUserProfileRoute,
	getUpdateUserRoute,
	getDeleteUserRoute,
} from '../utils/constants'
import api from './api'

// product api endpoints
const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// user endpoints
		getProfile: builder.query({
			query: () => getUserProfileRoute(),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: getUserRegisterRoute(),
				method: 'POST',
				body: credentials,
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: getUserLoginRoute(),
				method: 'POST',
				body: credentials,
			}),
		}),
		updateUser: builder.mutation({
			query: (userData) => ({
				url: getUpdateUserRoute(),
				method: 'PUT',
				body: userData,
			}),
		}),
		deleteUser: builder.mutation({
			query: () => ({
				url: getDeleteUserRoute(),
				method: 'DELETE',
			}),
		}),
		logout: builder.mutation({
			queryFn: () => ({ data: {} }),
		}),
	}),
})

export default userApi

export const {
	useGetProfileQuery,
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = userApi
