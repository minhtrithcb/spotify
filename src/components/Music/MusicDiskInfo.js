import React from 'react'
import { subString } from '../../helper/helper'
import { useSelector } from 'react-redux'

const MusicDiskInfo = () => {
	const { albumInfo, currentSong, isPlaying } = useSelector(
		(state) => state.music
	)
	return (
		<React.Fragment>
			<div
				className={`w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] overflow-hidden shadow-2xl shadow-green-500/30
                    bg-gradient-to-r from-green-700 to-teal-700 mt-8 rounded-full duration-700 mx-auto ${
						isPlaying ? 'diskSpinPlay' : 'diskSpinPaused '
					}`}
			>
				<img
					src={albumInfo?.thumbnail}
					alt='thumbnail'
					className='w-full h-full object-cover '
				/>
			</div>

			<div className='px-4 lg:px-0 text-center'>
				<h1
					className='text-2xl lg:text-5xl font-bold py-2 my-4 '
					title={currentSong?.title}
				>
					{currentSong?.title && subString(currentSong?.title, 30)}
				</h1>
				<p className='tracking-[5px] text-lg'>{currentSong?.artists}</p>
			</div>
		</React.Fragment>
	)
}

export default MusicDiskInfo
