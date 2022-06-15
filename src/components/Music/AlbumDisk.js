import React, { useRef } from 'react'
import { BsChevronDown, BsHeart } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { subString } from '../../helper/helper'
const AlbumDisk = ({ isOpen, setIsOpen }) => {
	const { albumInfo, currentSong, isPlaying } = useSelector(
		(state) => state.music
	)
	const nodeRef = useRef(null)

	return (
		<CSSTransition
			in={isOpen}
			timeout={300}
			classNames='slideY'
			unmountOnExit
			nodeRef={nodeRef}
		>
			<div
				className='fixed w-full h-[calc(100vh_-_240px)] p-4 flex justify-center flex-col items-center top-0 left-0 bg-gray-800 z-50 text-white'
				ref={nodeRef}
			>
				<div className='flex justify-between absolute top-0 w-full p-4'>
					<button
						className='px-4 py-2 rounded bg-green-400 flex text-black items-center'
						onClick={() => setIsOpen(false)}
					>
						<BsChevronDown className='mr-2' /> Back
					</button>
					<div className='w-10 h-10 flex items-center justify-center p-2 cursor-pointer hover:bg-green-500 transition-all rounded-full '>
						<BsHeart />
					</div>
				</div>
				<div
					className={`w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] overflow-hidden shadow-2xl shadow-green-500/30
					bg-gradient-to-r from-green-700 to-teal-700 mx-4 rounded-full duration-700 ${
						isPlaying ? 'diskSpinPlay' : 'diskSpinPaused '
					}`}
				>
					<img
						src={albumInfo?.thumbnail}
						alt='thumbnail'
						className='w-full h-full object-cover '
					/>
				</div>

				<div className='px-4 lg:px-0'>
					<h1
						className='text-3xl lg:text-5xl font-bold py-2 my-4'
						title={currentSong?.title}
					>
						{currentSong?.title &&
							subString(currentSong?.title, 30)}
					</h1>
					<p className=' tracking-[5px] text-lg'>
						{currentSong?.artists}
					</p>
				</div>
			</div>
		</CSSTransition>
	)
}

export default AlbumDisk
