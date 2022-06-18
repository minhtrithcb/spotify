import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import useOutsite from '../../hooks/useOutsite'
import {
	setCursorIndexSong,
	setMusic,
	setPlayListShuffle,
	setSearchPlayList,
} from '../../redux/slice/musicSlice'

const AlbumSearch = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const dispatch = useDispatch()
	const { albumInfo, isShuffle, cursorIndexSong, searchPlayList } =
		useSelector((state) => state.music)

	const debouncedValue = useDebounce(searchInput)
	const inputRef = useRef(null)
	// Click outsite search box
	useOutsite(inputRef, () => {
		setIsOpenSearch(false)
	})
	// Handle search input change
	const handleChageInput = (e) => {
		const value = e.target.value
		setSearchInput(value)
	}

	// Handle Higtlight Search every time debouncedValue change
	useEffect(() => {
		if (debouncedValue !== '' && searchInput !== '') {
			const searchFound = albumInfo?.playList.filter((song) => {
				return song.title
					.toLowerCase()
					.includes(searchInput.toLowerCase())
			})
			dispatch(setSearchPlayList(searchFound))
		} else {
			dispatch(setSearchPlayList([]))
		}
		// eslint-disable-next-line
	}, [debouncedValue])

	// Handle Keydown
	const handleKeyDown = (e) => {
		// Key enter
		if (e.keyCode === 13) {
			// call dispatch to clear shuffle
			if (isShuffle) dispatch(setPlayListShuffle())
			// find search and return array match
			const found = searchPlayList?.filter((i) =>
				i.title.toLowerCase().includes(searchInput.toLowerCase())
			)
			// find the curser index defaud 0
			const selectedSong = found[cursorIndexSong]
			// return the index of the cursor
			let indexSong = albumInfo?.playList.findIndex((song) => {
				return song === selectedSong
			})
			// in case found set this song
			if (indexSong !== -1) {
				dispatch(
					setMusic({
						albumPlayList: albumInfo?.playList,
						playListQueue: albumInfo?.playList,
						currentSong: albumInfo?.playList[indexSong],
						indexSong: indexSong,
					})
				)
				setSearchInput('')
				dispatch(setSearchPlayList([]))
			}
		}

		// Key down
		if (e.keyCode === 40) {
			const idxSearch =
				cursorIndexSong >= searchPlayList.length - 1
					? 0
					: cursorIndexSong + 1
			dispatch(setCursorIndexSong(idxSearch))
		}

		// Key up
		if (e.keyCode === 38) {
			const idxSearch =
				cursorIndexSong === 0
					? searchPlayList.length - 1
					: cursorIndexSong - 1
			dispatch(setCursorIndexSong(idxSearch))
		}
	}

	return (
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
					className={`pl-10 h-10 duration-300 outline-none bg-slate-600 rounded text-white ${
						isOpenSearch ? 'w-full' : 'w-[0%] '
					}`}
				/>
			</div>
		</div>
	)
}

export default AlbumSearch
