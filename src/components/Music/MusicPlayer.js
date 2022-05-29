import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BsFillPlayFill, BsFillPauseFill, BsHeart } from 'react-icons/bs'
import {
	MdSkipNext,
	MdSkipPrevious,
	MdOutlineRepeat,
	MdAllInclusive,
	MdVolumeUp,
} from 'react-icons/md'
import audio1 from '../../assets/mp3/Raven & Kreyn ft. Nino Lucarelli - This Far (RudeLies Remix).mp3'
import audio2 from '../../assets/mp3/Nightcore - Shadows - (Lyrics).mp3'
import audio3 from '../../assets/mp3/Sing 2 _ I Like It Song Cardi B (Lyrics) _ Sing 2.mp3'
const MusicPlayer = () => {
	const progessBarRef = useRef(null)
	const audioRef = useRef(null)
	const [title, setTitle] = useState('')
	const [artist, setArtist] = useState('')
	const [indexSong, setIndexSong] = useState(0)
	const [isPlay, setIsPlay] = useState(false)
	const [songRemaining, setSongRemaining] = useState('00 : 00')
	const [songDuration, setSongDuration] = useState('00 : 00')

	const Data = useMemo(
		() => [
			{
				id: 1,
				title: 'This Far',
				artist: 'Raven & Kreyn ft. Nino Lucarelli',
				src: audio1,
			},
			{
				id: 2,
				title: 'Shadows',
				artist: 'Nightcore',
				src: audio2,
			},
			{
				id: 3,
				title: 'I Like It Song',
				artist: 'Cardi B',
				src: audio3,
			},
		],
		[]
	)

	useEffect(() => {
		const setupfirstSong = () => {
			setUpSong(Data[0])
		}
		setupfirstSong()
	}, [Data])

	// Set current song
	const setUpSong = (music) => {
		if (audioRef.current) {
			audioRef.current.src = music.src
			setTitle(music.title)
			setArtist(music.artist)
		}
	}

	// Toggle isPlay & if it play show pause button and otherwise ...
	const playSong = () => {
		setIsPlay((prev) => !prev)
		!isPlay ? audioRef.current.play() : audioRef.current.pause()
	}

	const playedSong = () => {
		setIsPlay(true)
		audioRef.current.play()
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
			setIndexSong(Data.length - 1)
			setUpSong(Data[Data.length - 1])
		} else {
			setIndexSong((prev) => prev - 1)
			setUpSong(Data[indexSong - 1])
		}
		playedSong()
	}

	// Next song
	const handleNext = () => {
		resetSong()
		if (Data.length - 1 === indexSong) {
			setIndexSong(0)
			setUpSong(Data[0])
		} else {
			setIndexSong((prev) => prev + 1)
			setUpSong(Data[indexSong + 1])
		}
		playedSong()
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
		playedSong()
	}

	// On change Input
	const handleChageRange = (e) => {
		const currentValue = e.target.value
		progessBarRef.current.value = currentValue
		audioRef.current.currentTime = currentValue
	}

	return (
		<div
			className='fixed text-white bg-gray-800  border-gray-700 border-t w-full h-28 bottom-20 
            lg:bottom-0 left-0 z-50 grid grid-cols-3 px-4 grid-rows-2 gap-2 py-2'
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
						<p className='text-sm md:text-base'>{title}</p>
						<p className='text-sm md:text-base'>{artist}</p>
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
						<MdAllInclusive fontSize={'1.2em'} />
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
						{isPlay ? (
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
					name='progessBar'
					max={100}
					defaultValue={100}
					className='col-span-6 appearance-none  h-1 bg-green-400 cursor-pointer my-2 slider '
					// ref={progessBarRef}
					// onChange={handleChageRange}
				/>
			</div>
		</div>
	)
}

export default MusicPlayer
