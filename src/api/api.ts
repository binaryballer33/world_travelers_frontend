import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserApiState } from '../types/State'
import { BACKEND_BASE_URL } from '../utils/secrets'

const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_BASE_URL,
		// Define headers to be added to every request
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as UserApiState).token
			headers.set('Content-Type', 'application/json')
			if (token) headers.set('authorization', `Bearer ${token}`)
			return headers
		},
	}),
	tagTypes: ['Trips'],
	endpoints: () => ({}), // define endpoints in their own separate files
})

export default api
