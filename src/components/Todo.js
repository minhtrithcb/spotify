import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { add, choseEdit, edit } from '../redux/slice/todoSlice'

const Todo = () => {
	const dispatch = useDispatch()
	const todoEdit = useSelector((state) => state.todo.chose)
	const [fieldAdd, setFieldAdd] = useState('')

	useEffect(() => {
		if (todoEdit !== null) setFieldAdd(todoEdit.text)
	}, [todoEdit])

	// Onchage Input
	const handleInputChage = (e) => {
		setFieldAdd(e.target.value)
	}

	// Add or edit
	const handleAddTodo = () => {
		if (fieldAdd === '') return
		const newId = uuidv4()
		const newTodo = {
			id: newId,
			text: fieldAdd,
			mark: false,
		}
		if (todoEdit !== null) {
			dispatch(
				edit({
					id: todoEdit.id,
					todoEdit: newTodo,
				})
			)
			dispatch(choseEdit(null))
		} else {
			dispatch(add(newTodo))
		}
		setFieldAdd('')
	}

	return (
		<div
			className='w-1/2 text-center absolute 
      top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col'
		>
			<TodoList />

			<input
				type='text'
				placeholder='Nhập việc cần làm'
				className='outline-none w-full border-2 my-4 p-4 ring-orange-200 focus:ring-2 rounded'
				onChange={handleInputChage}
				value={fieldAdd}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						handleAddTodo()
					}
				}}
			/>

			<button
				className='bg-orange-400 w-full py-4 duration-500 
        		hover:bg-orange-500 text-white rounded-md active:ring-4 ring-orange-400'
				onClick={handleAddTodo}
			>
				{todoEdit === null ? 'Thêm việc cần làm' : 'Sửa việc cần làm'}
			</button>
		</div>
	)
}

export default Todo
