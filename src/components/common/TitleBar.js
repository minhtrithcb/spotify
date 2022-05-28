import React from 'react'
import { Link } from 'react-router-dom'

const TitleBar = ({ title = 'Title', linkSeeAll = '/' }) => {
	return (
		<div className='h-10 my-4 w-full flex justify-between text-white items-center'>
			<span className='text-lg font-semibold uppercase px-4 py-1 cursor-pointer duration-300'>
				<Link to={linkSeeAll}>{title}</Link>
			</span>
			<span className='text-sm uppercase rounded hover:bg-slate-700 px-4 py-1 cursor-pointer duration-300'>
				<Link to={linkSeeAll}>SEE ALL</Link>
			</span>
		</div>
	)
}

export default TitleBar
