import React, { useEffect, useRef, useState } from 'react'
import {
	BsArrowLeft,
	BsFillPlayFill,
	BsArrowRight,
	BsFillPauseFill,
} from 'react-icons/bs'
import audio1 from '../assets/mp3/Raven & Kreyn ft. Nino Lucarelli - This Far (RudeLies Remix).mp3'
import audio2 from '../assets/mp3/Nightcore - Shadows - (Lyrics).mp3'
import audio3 from '../assets/mp3/Sing 2 _ I Like It Song Cardi B (Lyrics) _ Sing 2.mp3'

const Music = () => {
	const progessBarRef = useRef(null)
	const audioRef = useRef(null)
	const [title, setTitle] = useState('')
	const [artist, setArtist] = useState('')
	const [indexSong, setIndexSong] = useState(0)
	const [isPlay, setIsPlay] = useState(false)
	const [songRemaining, setSongRemaining] = useState('00 : 00')
	const [songDuration, setSongDuration] = useState('00 : 00')
	const Data = [
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
	]

	useEffect(() => {
		const setupfirstSong = () => {
			setUpSong(Data[0])
		}
		setupfirstSong()
	}, [])

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
		<div className='  bg-orange-100 rounded-lg p-4 h-[500px]  flex justify-center flex-col'>
			<p className='text-lg font-bold'>{title}</p>
			<p>{artist}</p>
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onCanPlayThrough={handleCanplaythrough}
				onEnded={handleEnded}
			></audio>

			<div className='flex justify-between mt-4 text-sm'>
				<span>{songRemaining}</span>
				<span>{songDuration}</span>
			</div>

			<input
				type='range'
				name='progessBar'
				className='appearance-none w-full h-1 bg-orange-200 cursor-pointer my-4 slider '
				ref={progessBarRef}
				onChange={handleChageRange}
			/>

			<div className='flex justify-between my-4'>
				<span
					onClick={handlePrev}
					className='w-14 h-14 text-white cursor-pointer hover:bg-orange-600 transition-all bg-orange-400 flex items-center justify-center'
				>
					<BsArrowLeft fontSize={'1.5em'} />
				</span>
				<span
					onClick={playSong}
					className='w-14 h-14 text-white cursor-pointer hover:bg-orange-600 transition-all bg-orange-400 flex items-center justify-center'
				>
					{isPlay ? (
						<BsFillPauseFill fontSize={'1.5em'} />
					) : (
						<BsFillPlayFill fontSize={'1.5em'} />
					)}
				</span>
				<span
					onClick={handleNext}
					className='w-14 h-14  text-white cursor-pointer hover:bg-orange-600 transition-all bg-orange-400 flex items-center justify-center'
				>
					<BsArrowRight fontSize={'1.5em'} />
				</span>
			</div>
		</div>
	)
}

export default Music
