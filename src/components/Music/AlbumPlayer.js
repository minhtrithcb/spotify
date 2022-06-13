import React, { useRef, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import {
	BsDownload,
	BsSearch,
	BsFillPauseFill,
	BsFillPlayFill,
} from 'react-icons/bs'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import useOutsite from '../../hooks/useOutsite'
import { useSelector, useDispatch } from 'react-redux'
import {
	setIsPlaying,
	setMusic,
	setSearchPlayList,
	setTogglePlay,
} from '../../redux/slice/musicSlide'

const AlbumPlayer = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const inputRef = useRef(null)
	const typingTimer = useRef(null)
	const dispatch = useDispatch()
	const {
		albumInfo,
		isPlaying,
		indexSong,
		togglePlay,
		currentSong,
		albumPlayList,
		searchPlayList,
	} = useSelector((state) => state.music)
	const [searchInput, setSearchInput] = useState('')

	// Click outsite search box
	useOutsite(inputRef, () => {
		setIsOpenSearch(false)
	})

	// Toggle isPlay & if it play show pause button and otherwise ...
	const playSong = () => {
		// Playing this album only the first time
		if (albumPlayList.length === 0 && indexSong === 0)
			return setupPlayAlbum()

		// If user on same album is play pause when click
		if (currentSong?.albumId + '' === albumInfo.id) {
			dispatch(setTogglePlay(!togglePlay))
		} else {
			// Otherwise user on the other album setup again
			setupPlayAlbum()
		}
	}

	// Set up to run this album and the first song
	const setupPlayAlbum = () => {
		dispatch(setIsPlaying(!isPlaying))
		dispatch(
			setMusic({
				albumPlayList: albumInfo?.playList,
				currentSong: albumInfo?.playList[0],
				indexSong: 0,
			})
		)
	}

	// Check if song on play equal album id
	// currentSong?.albumId + '' => return string
	const checkIsPlayingOnAlbum = () => {
		return isPlaying && currentSong?.albumId + '' === albumInfo?.id
	}

	// Handle Higtlight Search
	const handleChageInput = (e) => {
		const value = e.target.value
		setSearchInput(value)
		if (typingTimer.current) clearTimeout(typingTimer.current)

		if (value !== '') {
			typingTimer.current = setTimeout(() => {
				const searchFound = albumInfo?.playList.filter((song) => {
					return song.title
						.toLowerCase()
						.includes(value.toLowerCase())
				})
				dispatch(setSearchPlayList(searchFound))
			}, 700)
		} else {
			dispatch(setSearchPlayList([]))
		}
	}

	// Handle Keydown enter
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			const found = searchPlayList?.filter((i) =>
				i.title.toLowerCase().includes(searchInput.toLowerCase())
			)
			const selectedSong = found[0]
			const indexSong = albumInfo?.playList.findIndex((song) => {
				return song === selectedSong
			})
			if (indexSong !== -1) {
				dispatch(
					setMusic({
						albumPlayList: albumInfo?.playList,
						currentSong: albumInfo?.playList[indexSong],
						indexSong: indexSong,
					})
				)
				setSearchInput('')
				dispatch(setSearchPlayList([]))
			}
		}
	}

	return (
		<div className='sticky mt-2 top-0 h-14 bg-slate-800 flex items-center justify-between px-0 z-30 md:px-4'>
			<div className='flex'>
				<span
					className='w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 text-black shadow-md cursor-pointer'
					onClick={playSong}
				>
					{checkIsPlayingOnAlbum() ? (
						<BsFillPauseFill fontSize={'1.2em'} />
					) : (
						<BsFillPlayFill fontSize={'1.2em'} />
					)}
				</span>
				<span
					className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
                    rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
				>
					<FaRegHeart />
				</span>

				<Dropdown
					positionX={true}
					title={
						<span
							className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
						   rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
						>
							<BsDownload />
						</span>
					}
				>
					<DropdownItem>Title</DropdownItem>
					<DropdownItem>Artist</DropdownItem>
					<DropdownItem>Album</DropdownItem>
					<DropdownItem>Date added</DropdownItem>
					<DropdownItem>Duration</DropdownItem>
				</Dropdown>
			</div>

			<div className='flex items-center'>
				<div
					className={`relative text-black transition-all ${
						!isOpenSearch ? 'w-10' : 'w-52'
					} `}
				>
					<div
						className='text-white flex items-center justify-center 
						absolute top-0 left-0 cursor-pointer bg-transparent h-10 w-10'
						onClick={() => {
							inputRef.current.focus()
							setIsOpenSearch((prev) => !prev)
						}}
					>
						<BsSearch />
					</div>
					<input
						type='text'
						ref={inputRef}
						onChange={handleChageInput}
						value={searchInput}
						onKeyDown={handleKeyDown}
						placeholder='Search playlist'
						className={`pl-10 h-10 duration-300 outline-none
						bg-slate-600 rounded text-white ${isOpenSearch ? 'w-full' : 'w-[0%] '}`}
					/>
				</div>
			</div>
		</div>
	)
}

export default AlbumPlayer
