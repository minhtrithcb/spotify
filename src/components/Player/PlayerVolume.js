import React, { useEffect, useRef, useState } from 'react'
import { BsHeart } from 'react-icons/bs'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import { setIsMute, setVolume } from '../../redux/slice/musicSlice'

const PlayerVolume = () => {
	const { isMute } = useSelector((state) => state.music)
	const [stateVolume, setStateVolume] = useState(1)
	const volumeRef = useRef(null)
	const dispatch = useDispatch()
	const debouncedValue = useDebounce(stateVolume, 300)

	// Debouce volume change
	useEffect(() => {
		dispatch(setVolume(stateVolume))
		// eslint-disable-next-line
	}, [debouncedValue])

	// Change Volume
	const handleChageVolume = (e) => {
		// // if adready mute, unmute that
		if (isMute) dispatch(setIsMute(false))
		setStateVolume(e.target.value / 100)
	}

	// Mute song
	const handleMute = () => {
		let volumeValue
		!isMute ? (volumeValue = 0) : (volumeValue = 1)
		volumeRef.current.value = volumeValue * 100
		dispatch(setIsMute(!isMute))
		dispatch(setVolume(volumeValue))
	}

	return (
		<div className='lg:col-auto lg:row-span-2 hidden lg:flex items-center justify-end'>
			<div className='p-2 cursor-pointer hover:bg-green-500 transition-all rounded-full '>
				<BsHeart />
			</div>
			<div
				className='w-10 h-10 flex justify-center items-center cursor-pointer text-[1.2em]'
				onClick={handleMute}
			>
				{!isMute ? <MdVolumeUp /> : <MdVolumeOff />}
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
	)
}

export default PlayerVolume
