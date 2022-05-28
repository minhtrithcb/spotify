import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AlbumItem = ({ data: { id, artists, album } }) => {
	return (
		<li
			className='h-[200px] bg-slate-700 text-white rounded-md p-2 
            hover:bg-slate-600 duration-300 cursor-pointer relative group '
		>
			<div className='h-[130px] rounded-md w-full shadow-md bg-gradient-to-r from-green-500 to-teal-500'></div>
			<Link to={`/album/${id}`} className='font-bold mt-2 block'>
				{album}
			</Link>
			{artists.map((a) => a)}

			<Link to={`/album/${id}`}>
				<span
					onContextMenu={(e) => {
						e.preventDefault()
					}}
					className='absolute w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 bottom-16 opacity-0 text-black shadow-md
                    group-hover:opacity-100
                    group-hover:bottom-20'
				>
					<FaPlay />
				</span>
			</Link>
			<span>text</span>
		</li>
	)
}

export default AlbumItem
