import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import todoSlice from './slice/todoSlice'
import musicSlide from './slice/musicSlide'

export default configureStore({
	reducer: {
		todo: todoSlice,
		auth: authSlice,
		music: musicSlide,
	},
})
