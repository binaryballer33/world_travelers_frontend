import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_BASE_URL } from '../utils/constants'
import { User } from '../types/State'

// Define an API using createApi
const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_BASE_URL,
		// Define headers to be added to every request
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as User).token
			headers.set('Content-Type', 'application/json')
			if (token) headers.set('authorization', `Bearer ${token}`)
			return headers
		},
	}),
	tagTypes: ['Trips'],
	endpoints: () => ({}), // define endpoints in their own separate files
})

export default api
