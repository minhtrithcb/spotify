import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	BsFillPlayFill,
	BsFillPauseFill,
	BsHeart,
	BsShuffle,
} from 'react-icons/bs'
import {
	MdSkipNext,
	MdSkipPrevious,
	MdOutlineRepeat,
	MdVolumeUp,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
	setIsPlaying,
	setIndexSong,
	setMusic,
} from '../../redux/slice/musicSlide'

const MusicPlayer = () => {
	const dispatch = useDispatch()
	const progessBarRef = useRef(null)
	const audioRef = useRef(null)
	const [songRemaining, setSongRemaining] = useState('00 : 00')
	const [songDuration, setSongDuration] = useState('00 : 00')
	const { albumPlayList, indexSong, isPlaying, currentSong } = useSelector(
		(state) => state.music
	)

	// Force play
	const forcePlay = useCallback(() => {
		dispatch(setIsPlaying(true))
		audioRef.current.play()
	}, [dispatch])

	// Set up
	useEffect(() => {
		const setupfirstSong = () => {
			if (albumPlayList.length !== 0) {
				setUpSong(albumPlayList[indexSong])
				forcePlay()
			}
		}
		setupfirstSong()
	}, [indexSong, albumPlayList, forcePlay])

	// Set current song
	const setUpSong = (music) => {
		if (audioRef.current && music) {
			audioRef.current.src = music.src
		}
	}

	// Toggle isPlay & if it play show pause button and otherwise ...
	const playSong = () => {
		dispatch(setIsPlaying(!isPlaying))
		!isPlaying ? audioRef.current.play() : audioRef.current.pause()
	}

	// pause & reset stop
	const resetSong = () => {
		setSongRemaining('00 : 00')
		calcDuration()
	}

	// Calc time by curren or duration
	const calTime = (time, cb) => {
		// readyState === 4 => song is ready
		if (audioRef.current && audioRef?.current.readyState === 4) {
			const totalSecond = audioRef?.current[time] // 80s
			const minute = Math.floor(totalSecond / 60) // ex: 1.3 +> 1
			const second = Math.floor(totalSecond - minute * 60) // ex: 80 - (1 * 60)  => 20s => 1m: 20s
			cb(minute, second)
		}
	}

	// Calc by currentTime (display left side)
	const calcRemain = () => {
		calTime('currentTime', (minute, second) => {
			setSongRemaining(
				`${minute < 9 ? `0${minute}` : minute} : ${
					second < 9 ? `0${second}` : second
				}`
			)
		})
	}

	// Calc by duration (display right side)
	const calcDuration = () => {
		calTime('duration', (minute, second) => {
			setSongDuration(
				`${minute < 9 ? `0${minute}` : minute} : ${
					second < 9 ? `0${second}` : second
				}`
			)
		})
	}

	// Previos song
	const handlePrev = () => {
		resetSong()
		if (indexSong === 0) {
			dispatch(
				setMusic({
					albumPlayList,
					currentSong: albumPlayList[albumPlayList.length - 1],
					indexSong: albumPlayList.length - 1,
				})
			)
		} else {
			dispatch(
				setMusic({
					albumPlayList,
					currentSong: albumPlayList[indexSong - 1],
					indexSong: indexSong - 1,
				})
			)
		}
		forcePlay()
	}

	// Next song
	const handleNext = () => {
		resetSong()
		if (albumPlayList.length - 1 === indexSong) {
			dispatch(
				setMusic({
					albumPlayList,
					currentSong: albumPlayList[0],
					indexSong: 0,
				})
			)
		} else {
			dispatch(
				setMusic({
					albumPlayList,
					currentSong: albumPlayList[indexSong + 1],
					indexSong: indexSong + 1,
				})
			)
		}
		forcePlay()
	}

	// On audio run
	const handleTimeUpdate = () => {
		calcRemain()
		progessBarRef.current.value = audioRef.current.currentTime
	}

	// On audio ready
	const handleCanplaythrough = () => {
		calcDuration()
		progessBarRef.current.max = audioRef.current.duration
	}

	// On audio ended
	const handleEnded = () => {
		handleNext()
		forcePlay()
	}

	// On change Input
	const handleChageRange = (e) => {
		const currentValue = e.target.value
		progessBarRef.current.value = currentValue
		audioRef.current.currentTime = currentValue
	}

	// Change Volume
	const handleChageVolume = (e) => {
		audioRef.current.volume = e.target.value / 100
	}

	return (
		<div
			className={`${
				albumPlayList.length !== 0 ? 'grid' : 'hidden'
			} fixed text-white bg-gray-800  border-gray-700 border-t w-full h-28 bottom-20 
            lg:bottom-0 left-0 z-50 grid-cols-3 px-4 grid-rows-2 gap-2 py-2 `}
		>
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onCanPlayThrough={handleCanplaythrough}
				onEnded={handleEnded}
			></audio>
			<div className='row-span-2 col-span-3 lg:col-auto lg:row-span-2 flex items-center justify-between sm:flex-col sm:items-start md:justify-center'>
				<div className='flex items-center'>
					<div className='rounded mr-4 bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10'></div>
					<div>
						<p className='text-sm md:text-base'>
							{currentSong?.title}
						</p>
						<p className='text-xs md:text-sm'>
							{currentSong?.artists}
						</p>
					</div>
				</div>
			</div>
			<div className='row-span-1 col-span-3 lg:col-auto'>
				<div className='flex justify-between items-center lg:w-3/4 mx-auto lg:my-2'>
					<span
						// onClick={handlePrev}
						className='w-8 h-8 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
					>
						<BsShuffle fontSize={'1.2em'} />
					</span>
					<span
						onClick={handlePrev}
						className='w-10 h-10 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
					>
						<MdSkipPrevious fontSize={'1.5em'} />
					</span>
					<span
						onClick={playSong}
						className='w-10 h-10 text-black rounded-full cursor-pointer 
                        hover:scale-110 transition-all bg-white flex items-center justify-center'
					>
						{isPlaying ? (
							<BsFillPauseFill fontSize={'1.2em'} />
						) : (
							<BsFillPlayFill fontSize={'1.2em'} />
						)}
					</span>
					<span
						onClick={handleNext}
						className='w-10 h-10 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
					>
						<MdSkipNext fontSize={'1.5em'} />
					</span>
					<span
						// onClick={handleNext}
						className='w-8 h-8 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
					>
						<MdOutlineRepeat fontSize={'1.2em'} />
					</span>
				</div>

				<div className='hidden lg:grid grid-cols-8 py-2 '>
					<span className='text-xs my-[2px]'>{songRemaining}</span>
					<input
						type='range'
						name='progessBar'
						className='col-span-6 appearance-none w-full h-1 bg-green-400 cursor-pointer my-2 slider '
						ref={progessBarRef}
						defaultValue={0}
						onChange={handleChageRange}
					/>
					<span className='text-right text-xs my-[2px]'>
						{songDuration}
					</span>
				</div>
			</div>
			<div className='lg:col-auto lg:row-span-2 hidden lg:flex items-center justify-end'>
				<div className='p-2 cursor-pointer hover:bg-green-500 transition-all rounded-full '>
					<BsHeart />
				</div>
				<div className='w-10 h-10 flex justify-center items-center'>
					<MdVolumeUp fontSize={'1.2em'} />
				</div>
				<input
					type='range'
					name='progessVolume'
					defaultValue={100}
					className='col-span-6 appearance-none  h-1 bg-green-400 cursor-pointer my-2 slider '
					onChange={handleChageVolume}
				/>
			</div>
		</div>
	)
}

export default MusicPlayer
