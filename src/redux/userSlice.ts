import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import userApi from '../api/backendApis/userApi' // HAVE TO IMPORT userApi HERE and NOT api!!!
import { USER } from '../utils/constants'
import { UserApiState } from '../types/State'

// callback function to store user and token in session storage and state
function storeUserAndToken(state: UserApiState, action: PayloadAction<any>) {
	state.token = action.payload.token
	state.user = action.payload.user

	window.sessionStorage.setItem(
		USER,
		JSON.stringify({
			token: action.payload.token,
			user: action.payload.user,
		})
	)
}

const initialState = {
	token: '',
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.getProfile.matchFulfilled,
			(state, action) => (state.user = action.payload.user)
		)
		builder.addMatcher(
			userApi.endpoints.register.matchFulfilled,
			storeUserAndToken
		)
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			storeUserAndToken
		)
		builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = ''
			state.user = null
			window.sessionStorage.removeItem(USER)
		})
	},
})

export default userSlice.reducer
