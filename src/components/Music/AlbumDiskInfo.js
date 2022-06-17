import React from 'react'
import { subString } from '../../helper/helper'
import { useSelector } from 'react-redux'
import { BsHeart } from 'react-icons/bs'
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md'

const AlbumDiskInfo = () => {
	const { albumInfo, currentSong, isPlaying } = useSelector(
		(state) => state.music
	)

	return (
		<React.Fragment>
			<div
				className={`w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] relative
					lg:w-[200px] lg:h-[200px] overflow-hidden shadow-2xl shadow-green-500/30
                    bg-gradient-to-r from-green-700 to-teal-700 mt-8 rounded-full duration-700 mx-auto ${
						isPlaying ? 'diskSpinPlay' : 'diskSpinPaused '
					}`}
			>
				<img
					src={albumInfo?.thumbnail}
					alt='thumbnail'
					className='w-full h-full object-cover '
				/>
				<div
					className='w-[70px] h-[70px] rounded-full 
					absolute bg-white left-1/2 top-1/2 
					-translate-x-1/2 -translate-y-1/2
				'
				></div>
				<div
					className='w-[35px] h-[35px] rounded-full 
					absolute bg-slate-600 left-1/2 top-1/2 
					-translate-x-1/2 -translate-y-1/2
				'
				></div>
			</div>

			<div className='px-4 lg:px-0 text-center'>
				<h1
					className='text-2xl lg:text-xl font-bold py-2 my-4 '
					title={currentSong?.title}
				>
					{currentSong?.title && subString(currentSong?.title, 30)}
				</h1>
				<p className='tracking-[5px] text-lg'>{currentSong?.artists}</p>
			</div>

			<div className='flex items-center my-2'>
				<div className='p-2 cursor-pointer hover:bg-green-500 transition-all rounded-full '>
					<BsHeart />
				</div>
				<div
					className='w-10 h-10 flex justify-center items-center cursor-pointer'
					// onClick={handleMute}
				>
					{true ? (
						<MdVolumeUp fontSize={'1.2em'} />
					) : (
						<MdVolumeOff fontSize={'1.2em'} />
					)}
				</div>
				<input
					type='range'
					name='progessVolume'
					defaultValue={100}
					className='appearance-none w-full h-1 bg-green-400 cursor-pointer my-2 slider '
					// onChange={handleChageVolume}
					// ref={volumeRef}
				/>
			</div>
		</React.Fragment>
	)
}

export default AlbumDiskInfo
