import React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { subString } from '../../helper/helper'
import { setIsOpenDisk } from '../../redux/slice/musicSlice'
import Wave from '../common/Wave'

const PlayerInfo = () => {
	const { currentSong, isOpenDisk, isPlaying, albumInfo } = useSelector(
		(state) => state.music
	)
	const dispatch = useDispatch()
	return (
		<div
			className={`row-span-2 col-span-3 lg:col-auto lg:row-span-2 cursor-pointer 
            flex items-center justify-between sm:flex-col sm:items-start md:justify-center`}
			onClick={() => dispatch(setIsOpenDisk(!isOpenDisk))}
		>
			<div className='flex items-center justify-between w-full hover:bg-slate-700/20 p-2 duration-300 rounded-md'>
				<div className='flex items-center'>
					{isPlaying ? (
						<Wave />
					) : (
						<div className='rounded overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10'>
							<img
								crossOrigin='anonymous'
								className='w-full h-full object-cover'
								src={albumInfo?.thumbnail}
								alt='thumbnail'
							/>
						</div>
					)}
					{currentSong && (
						<div className='ml-4'>
							<p className='text-sm' title={currentSong?.title}>
								{subString(currentSong?.title, 30)}
							</p>
							<p className='text-xs' title={currentSong?.artists}>
								{subString(currentSong?.artists, 30)}
							</p>
						</div>
					)}
				</div>
				<div className='w-8 h-8 flex items-center justify-center'>
					{!isOpenDisk ? <BsChevronUp /> : <BsChevronDown />}
				</div>
			</div>
		</div>
	)
}

export default PlayerInfo
