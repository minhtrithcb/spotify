import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { choseEdit, remove } from '../redux/slice/todoSlice'

const TodoList = () => {
	const todoList = useSelector((state) => state.todo.list)
	const dispatch = useDispatch()

	const handelRemoveTodo = (id) => {
		dispatch(remove(id))
	}

	const handelEditTodo = (todo) => {
		dispatch(choseEdit(todo))
	}
	return (
		<div className='w-full text-left'>
			<h1 className='text-3xl font-bold py-4'>Danh sách</h1>
			<ul>
				{todoList.length > 0 ? (
					todoList.map((todo) => (
						<li
							key={todo.id}
							className='w-full p-4 bg-orange-100 mb-2 flex items-center justify-between'
						>
							<span>{todo.text}</span>
							<div className='flex'>
								<span
									onClick={() => handelEditTodo(todo)}
									className='w-8 h-8 flex items-center justify-center cursor-pointer'
								>
									<AiOutlineEdit fontSize={'1.3em'} />
								</span>
								<span
									onClick={() => handelRemoveTodo(todo.id)}
									className='w-8 h-8 flex items-center justify-center cursor-pointer'
								>
									<AiOutlineDelete fontSize={'1.3em'} />
								</span>
							</div>
						</li>
					))
				) : (
					<li>Danh sách trống</li>
				)}
			</ul>
		</div>
	)
}

export default TodoList
