import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	list: [],
	chose: null,
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		add: (state, action) => {
			state.list.push(action.payload)
		},
		remove: (state, action) => {
			state.list = state.list.filter((todo) => todo.id !== action.payload)
		},
		choseEdit: (state, action) => {
			state.chose = action.payload
		},
		edit: (state, action) => {
			const indexFound = state.list.findIndex(
				(todo) => todo.id === action.payload.id
			)
			state.list[indexFound] = action.payload.todoEdit
		},
	},
})

export const { add, remove, choseEdit, edit } = todoSlice.actions
export default todoSlice.reducer
