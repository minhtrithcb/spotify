import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	BsFillPlayFill,
	BsFillPauseFill,
	BsHeart,
	BsShuffle,
	BsChevronUp,
	BsChevronDown,
} from 'react-icons/bs'
import {
	MdSkipNext,
	MdSkipPrevious,
	MdOutlineRepeat,
	MdVolumeUp,
	MdVolumeOff,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { subString } from '../../helper/helper'
import {
	setIsLoop,
	setIsPlaying,
	setMusic,
	setIsMute,
	setPlayListShuffle,
	setIsOpenDisk,
} from '../../redux/slice/musicSlice'
import useResize from '../../hooks/useResize'
import AlbumDisk from './AlbumDisk'

const MusicPlayer = () => {
	const dispatch = useDispatch()
	const progessBarRef = useRef(null)
	const audioRef = useRef(null)
	const volumeRef = useRef(null)
	const [songRemaining, setSongRemaining] = useState('00 : 00')
	const [songDuration, setSongDuration] = useState('00 : 00')
	const {
		albumPlayList,
		indexSong,
		isPlaying,
		currentSong,
		togglePlay,
		isMute,
		isShuffle,
		playListShuffle,
		isLoop,
		isOpenDisk,
		playListQueue,
	} = useSelector((state) => state.music)
	// Force play
	const forcePlay = useCallback(() => {
		dispatch(setIsPlaying(true))
		audioRef.current.play()
	}, [dispatch])
	// when breakpoin 1024px auto hide isOpenMobiePlayer
	useResize(1024, () => {
		dispatch(setIsOpenDisk(false))
	})

	// Set up set src and play it
	useEffect(() => {
		const setupfirstSong = () => {
			if (playListQueue.length !== 0) {
				setUpSong(playListQueue[indexSong])
				forcePlay()
			}
		}
		setupfirstSong()
	}, [indexSong, playListQueue, forcePlay, playListShuffle])

	// toggle play every togglePlay change (trigger in AlbumPlayer)
	useEffect(() => {
		// prevent first load
		if (albumPlayList.length !== 0) {
			playSong()
		}
		// eslint-disable-next-line
	}, [togglePlay])

	// Setup src song
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
				`${minute < 10 ? `0${minute}` : minute} : ${
					second < 10 ? `0${second}` : second
				}`
			)
		})
	}

	// Calc by duration (display right side)
	const calcDuration = () => {
		calTime('duration', (minute, second) => {
			setSongDuration(
				`${minute < 10 ? `0${minute}` : minute} : ${
					second < 10 ? `0${second}` : second
				}`
			)
		})
	}

	// Previos song
	const handlePrev = () => {
		resetSong()
		const condition = indexSong === 0
		dispatch(
			setMusic({
				albumPlayList,
				playListQueue,
				currentSong: condition
					? playListQueue[playListQueue.length - 1]
					: playListQueue[indexSong - 1],
				indexSong: condition ? playListQueue.length - 1 : indexSong - 1,
			})
		)
	}

	// Next song
	const handleNext = () => {
		resetSong()
		const condition = playListQueue.length - 1 === indexSong
		dispatch(
			setMusic({
				albumPlayList,
				playListQueue,
				currentSong: condition
					? playListQueue[0]
					: playListQueue[indexSong + 1],
				indexSong: condition ? 0 : indexSong + 1,
			})
		)
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
	}

	// On change Music Range
	const handleChageRange = (e) => {
		const currentValue = e.target.value
		progessBarRef.current.value = currentValue
		audioRef.current.currentTime = currentValue
	}

	// Change Volume
	const handleChageVolume = (e) => {
		// if adready mute, unmute that
		if (isMute) dispatch(setIsMute(false))
		audioRef.current.volume = e.target.value / 100
	}

	// Loop single song
	const handleLoopSong = (e) => {
		dispatch(setIsLoop(!isLoop))
		if (audioRef.current && !isLoop) {
			audioRef.current.loop = true
		} else {
			audioRef.current.loop = false
		}
	}

	// Mute song
	const handleMute = () => {
		let volume
		!isMute ? (volume = 0) : (volume = 1)
		audioRef.current.volume = volume
		volumeRef.current.value = volume * 100
		dispatch(setIsMute(!isMute))
	}

	// Toggle shuffle song
	const handleShuffle = () => {
		dispatch(setPlayListShuffle())
	}

	// useEffect(() => {

	// }, [musicVolume])

	return (
		<div>
			{/* // Mobile Player  */}
			<AlbumDisk />
			<div
				className={`${albumPlayList.length !== 0 ? 'grid' : 'hidden'}
			fixed text-white bg-gray-800  border-gray-700 border-t w-full h-40 lg:h-32
			bottom-20 lg:bottom-0 left-0 z-50 grid-cols-3 px-4 gap-4 py-4 grid-rows-2 `}
			>
				<audio
					preload='auto'
					crossOrigin='Anonymous'
					ref={audioRef}
					onTimeUpdate={handleTimeUpdate}
					onCanPlayThrough={handleCanplaythrough}
					onEnded={handleEnded}
				></audio>
				{/* // Title & artist  */}
				<div className='row-span-2 col-span-3 lg:col-auto lg:row-span-2 flex items-center justify-between sm:flex-col sm:items-start md:justify-center'>
					<div className='flex items-center justify-between w-full'>
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
						<div
							className='cursor-pointer lg:hidxden duration-300 hover:bg-slate-500 
							w-8 h-8 rounded-full flex items-center justify-center'
							onClick={() => dispatch(setIsOpenDisk(!isOpenDisk))}
						>
							{!isOpenDisk ? <BsChevronUp /> : <BsChevronDown />}
						</div>
					</div>
				</div>
				{/* // Control  */}
				<div className='row-span-1 col-span-3 lg:col-auto'>
					<div className='flex justify-between items-center lg:w-3/4 mx-auto lg:my-2'>
						<span
							onClick={handleShuffle}
							className={`w-8 h-8 rounded-full  text-white cursor-pointer 
							${isShuffle ? 'bg-green-500' : 'bg-transparent'}
                        	hover:bg-green-500 transition-all flex items-center justify-center`}
						>
							<BsShuffle title='Shuffle song' />
						</span>
						<span
							onClick={handlePrev}
							className='w-10 h-10 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
						>
							<MdSkipPrevious
								fontSize={'1.5em'}
								title='Previos song'
							/>
						</span>
						<span
							onClick={playSong}
							className='w-10 h-10 text-black rounded-full cursor-pointer 
                        hover:scale-110 transition-all bg-white flex items-center justify-center'
						>
							{isPlaying ? (
								<BsFillPauseFill
									fontSize={'1.2em'}
									title='Stop song'
								/>
							) : (
								<BsFillPlayFill
									fontSize={'1.2em'}
									title='Play song'
								/>
							)}
						</span>
						<span
							onClick={handleNext}
							className='w-10 h-10 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
						>
							<MdSkipNext fontSize={'1.5em'} title='Next song' />
						</span>
						<span
							onClick={handleLoopSong}
							className={`w-8 h-8 rounded-full  text-white cursor-pointer ${
								isLoop ? 'bg-green-500' : 'bg-transparent'
							}
                        hover:bg-green-500 transition-all flex items-center justify-center `}
						>
							<MdOutlineRepeat title='Loop song' />
						</span>
					</div>
					{/* // Music range  */}
					<div className={`grid grid-cols-8 py-2`}>
						<span className='text-xs my-[2px] select-none'>
							{songRemaining}
						</span>
						<input
							type='range'
							name='progessBar'
							className='col-span-6 appearance-none w-full h-1 bg-green-400 cursor-pointer my-2 slider '
							ref={progessBarRef}
							defaultValue={0}
							onChange={handleChageRange}
						/>
						<span className='text-right text-xs my-[2px] select-none'>
							{songDuration}
						</span>
					</div>
				</div>
				{/* // Volume  */}
				<div className='lg:col-auto lg:row-span-2 hidden lg:flex items-center justify-end'>
					<div className='p-2 cursor-pointer hover:bg-green-500 transition-all rounded-full '>
						<BsHeart />
					</div>
					<div
						className='w-10 h-10 flex justify-center items-center cursor-pointer'
						onClick={handleMute}
					>
						{!isMute ? (
							<MdVolumeUp fontSize={'1.2em'} />
						) : (
							<MdVolumeOff fontSize={'1.2em'} />
						)}
					</div>
					<input
						type='range'
						name='progessVolume'
						defaultValue={100}
						className='col-span-6 appearance-none  h-1 bg-green-400 cursor-pointer my-2 slider '
						onChange={handleChageVolume}
						ref={volumeRef}
					/>
				</div>
			</div>
		</div>
	)
}

export default MusicPlayer
