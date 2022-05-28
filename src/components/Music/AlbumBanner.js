import React from 'react'

const AlbumBanner = () => {
	return (
		<div className='w-full flex items-center h-[200px] md:h-[300px] bg-gradient-to-r from-green-500 to-teal-500 rounded-lg'>
			<div className='hidden lg:block w-[200px] h-[200px] bg-gradient-to-r from-green-700 to-teal-700 shadow-xl mx-4 rounded-lg'></div>
			<div className='px-4 lg:px-0'>
				<p className='uppercase tracking-[5px] text-xs'>
					Public playlist
				</p>
				<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold py-2'>
					Imagin Dragon MIX
				</h1>
				<p className='py-2'>
					Alesson, Twenty One Pilots, Robin Schulz{' '}
					<small className='opacity-80'>and more</small>
				</p>
				<p>
					<small className='opacity-80'>Made for </small> Trivo . 50
					song . <small className='opacity-80'>2hr 45min </small>
				</p>
			</div>
		</div>
	)
}

export default AlbumBanner
