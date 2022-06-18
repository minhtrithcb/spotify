import React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { subString } from '../../helper/helper'
import { setIsOpenDisk } from '../../redux/slice/musicSlice'

const PlayerInfo = () => {
	const { currentSong, isOpenDisk } = useSelector((state) => state.music)
	const dispatch = useDispatch()

	return (
		<div
			className={`row-span-2 col-span-3 lg:col-auto lg:row-span-2 cursor-pointer 
            flex items-center justify-between sm:flex-col sm:items-start md:justify-center`}
			onClick={() => dispatch(setIsOpenDisk(!isOpenDisk))}
		>
			<div className='flex items-center justify-between w-full hover:bg-slate-700/20 p-2 duration-300 rounded-md'>
				<div className='flex items-center'>
					<div className='rounded mr-4 bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10'></div>
					{currentSong && (
						<div>
							<p
								className='text-sm md:text-base'
								title={currentSong?.title}
							>
								{subString(currentSong?.title, 30)}
							</p>
							<p
								className='text-xs md:text-sm'
								title={currentSong?.artists}
							>
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
