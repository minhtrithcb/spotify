import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import todoSlice from './slice/todoSlice'

export default configureStore({
	reducer: {
		todo: todoSlice,
		auth: authSlice,
	},
})
