import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import todoSlice from './slice/todoSlice'
import musicSlice from './slice/musicSlice'

export default configureStore({
	reducer: {
		todo: todoSlice,
		auth: authSlice,
		music: musicSlice,
	},
})
