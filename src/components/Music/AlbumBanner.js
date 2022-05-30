import React from 'react'
import { useSelector } from 'react-redux'

const AlbumBanner = () => {
	const { album } = useSelector((state) => state.music)

	return (
		<div className='w-full flex items-center h-[200px] md:h-[300px] bg-gradient-to-r from-green-500 to-teal-500 rounded-lg'>
			<div className='hidden sm:block w-[100px] md:w-[150px] h-[100px] overflow-hidden md:h-[150px] bg-gradient-to-r from-green-700 to-teal-700 shadow-xl mx-4 rounded-lg'>
				<img
					src={album?.thumbnail}
					alt='thumbnail'
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='px-4 lg:px-0'>
				<p className='uppercase tracking-[5px] text-xs'>
					Public playlist
				</p>
				<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold py-2'>
					{album?.album}
				</h1>
				<p className='py-2'>
					{album?.artists.map((a) => a)}{' '}
					<small className='opacity-80'>and more</small>
				</p>
				<p>
					<small className='opacity-80'>Made for </small> Trivo .{' '}
					{album?.playList.length} song .{' '}
					<small className='opacity-80'>2hr 45min </small>
				</p>
			</div>
		</div>
	)
}

export default AlbumBanner
