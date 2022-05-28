import React from 'react'
import { Link } from 'react-router-dom'

const QuizItem = ({ data }) => {
	return (
		<div
			className='p-2 h-26 flex overflow-hidden
        	shadow-md rounded-md'
		>
			<img
				className='w-1/3 object-cover'
				src={require(`../assets/images/quizs/${data.Logo}`)}
				alt='quiz_item'
			/>
			<div className='w-2/3 pl-2'>
				<Link
					className='hover:text-orange-400 duration-300'
					to={`/quizs/${data.Id}`}
				>
					{data.Name}
				</Link>
				<p className='text-sm my-2'>Thời gian 10 phút</p>
				<p className='text-xs'>Hơn 200 câu hỏi</p>
				<div className='flex flex-wrap'>
					<span className='text-xs cursor-pointer mr-2 mt-2 rounded px-2 py-1 bg-orange-200 '>
						Android
					</span>
					<span className='text-xs cursor-pointer mr-2 mt-2 rounded px-2 py-1 bg-orange-200 '>
						Mysql
					</span>
					<span className='text-xs cursor-pointer mr-2 mt-2 rounded px-2 py-1 bg-orange-200 '>
						Javascript
					</span>
				</div>
			</div>
		</div>
	)
}

export default QuizItem
