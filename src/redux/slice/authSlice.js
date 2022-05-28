import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from '../../api/authApi'
import jwt_decode from 'jwt-decode'

const initialState = {
	currentUser: null,
	isLogin: false,
	loading: true,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.currentUser = payload.currentUser
			state.isLogin = payload.isLogin
		},
		checkAuth: (state, { payload }) => {
			state.currentUser = payload.currentUser
			state.isLogin = payload.isLogin
			state.loading = payload.loading
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAccessTK.fulfilled, (state, { payload }) => {
			if (payload.isLogin) {
				const user = jwt_decode(payload.accessToken)
				state.currentUser = user
			} else {
				state.currentUser = null
			}
			state.isLogin = payload.isLogin
			state.loading = false
		})
		builder.addCase(getAccessTK.rejected, (state, { payload }) => {
			state.currentUser = null
			state.isLogin = false
			state.loading = true
		})
	},
})

export const getAccessTK = createAsyncThunk('user/getAccessToken', async () => {
	try {
		const response = await authApi.getAccessTK()
		return response.data
	} catch (error) {
		return error
	}
})

export const { login, checkLogin, chageLoading, checkAuth } = authSlice.actions
export default authSlice.reducer
