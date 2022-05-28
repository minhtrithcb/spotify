import React from 'react'
import { FaPlay } from 'react-icons/fa'
const Home = () => {
	const List1 = [
		{
			id: 1,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 2,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 3,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 4,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 5,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 6,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 7,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
	]
	return (
		<div>
			<ul className='grid grid-cols-5 gap-4'>
				{List1.map((album) => (
					<li
						key={album.id}
						className='h-[200px] bg-slate-700 text-white rounded-md p-2 
                        hover:bg-slate-600 duration-300 cursor-pointer relative group 
                    '
					>
						<div
							className='h-[130px] rounded-md w-full 
                            shadow-md bg-gradient-to-r from-green-500 to-teal-500'
						></div>
						<p className='font-bold mt-2'>{album.album}</p>
						{album.artists.map((a) => a)}

						<span
							onContextMenu={(e) => {
								e.preventDefault()
							}}
							className='absolute w-10 h-10 bg-green-500 flex items-center justify-center
                            rounded-full right-4 duration-300 bottom-16 opacity-0 text-black
                            group-hover:opacity-100
                            group-hover:bottom-20'
						>
							<FaPlay />
						</span>
						<span>text</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Home
