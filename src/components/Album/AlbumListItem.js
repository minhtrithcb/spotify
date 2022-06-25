import React from 'react'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { subString } from '../../helper/helper'
import { setMusic, setPlayListShuffle } from '../../redux/slice/musicSlice'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import Wave from '../common/Wave'

const AlbumListItem = ({
	music,
	index,
	foundSongRef,
	followByIndexSongRef,
}) => {
	const [activeClickDropdown, setactiveClickDropdown] = useState(false)
	const dispatch = useDispatch()
	const {
		albumInfo,
		searchPlayList,
		currentSong,
		isPlaying,
		cursorIndexSong,
		isShuffle,
	} = useSelector((state) => state.music)

	// highLight all by searchPlayList
	const highLightAllSongSearch = (music) => {
		return searchPlayList?.find((song) => song.title.includes(music))
			? ' bg-teal-600'
			: ''
	}
	// highLight only index cursor by searchPlayList
	const highLightSongSearch = (music) => {
		return searchPlayList?.find(
			(song, index) =>
				song.title.includes(music) && index === cursorIndexSong
		)
			? ' bg-teal-700'
			: ''
	}

	// check index to set ref
	const checkHighLightIdx = () => {
		return searchPlayList?.find(
			(v, index) => v.title === music.title && index === cursorIndexSong
		)
	}

	// User chose song in album set playList & index Song
	const handleChoseMusic = () => {
		dispatch(
			setMusic({
				albumPlayList: albumInfo?.playList,
				currentSong: music,
				indexSong: index,
				playListQueue: albumInfo?.playList,
			})
		)
		// the first dispatch to cleart list the secont to set again
		if (isShuffle) {
			dispatch(setPlayListShuffle())
		}
	}

	// Add hover class on click
	const onGetHoverStatus = (isClick) => {
		setactiveClickDropdown(isClick)
	}

	return (
		<React.Fragment>
			<tr
				className={`cursor-pointer duration-300 hover:bg-slate-700
			    ${currentSong?.title === music.title ? 'bg-slate-700' : ''}
			    ${highLightSongSearch(music.title)}
			    ${highLightAllSongSearch(music.title)}
				${activeClickDropdown ? 'bg-slate-700' : ''}
			`}
				ref={checkHighLightIdx() ? foundSongRef : null}
				onClick={handleChoseMusic}
			>
				<td
					className='w-12 text-center rounded-l-lg'
					ref={
						currentSong?.title === music.title
							? followByIndexSongRef
							: null
					}
				>
					{index + 1}
				</td>
				<td className='py-4'>
					<div className='flex items-center'>
						{currentSong?.title === music.title && isPlaying ? (
							<Wave />
						) : (
							<div
								className='rounded block bg-gradient-to-r overflow-hidden
                            from-green-500 to-teal-500 w-10 h-10 flex-shrink-0'
							>
								<img
									crossOrigin='anonymous'
									className='w-full h-full object-cover'
									src={albumInfo?.thumbnail}
									alt='thumbnail'
								/>
							</div>
						)}
						<div className='ml-4'>
							<p
								title={music?.title}
								className='hidden sm:block whitespace-nowrap w-[300px] overflow-hidden'
							>
								{subString(music?.title, 30)}
							</p>
							<p
								title={music?.title}
								className='block sm:hidden whitespace-nowrap w-[300px] overflow-hidden'
							>
								{subString(music?.title, 20)}
							</p>
							<small title={music?.artists}>
								{subString(music?.artists, 30)}
							</small>
						</div>
					</div>
				</td>
				<td className='opacity-0 xl:opacity-100'>{albumInfo?.album}</td>
				<td className='opacity-0 lg:opacity-100'>3:20</td>
				<td className='w-12 rounded-r-lg text-right sm:text-left pr-4'>
					<div className='w-full flex justify-center'>
						<Dropdown
							positionY={
								index === albumInfo?.playList.length - 1
									? true
									: false
							}
							title={
								<div className='w-8 h-8 flex justify-center items-center hover:bg-slate-600 duration-300 rounded-full'>
									<BsThreeDotsVertical />
								</div>
							}
							getHoverStatus={onGetHoverStatus}
						>
							<DropdownItem>Add to playlist</DropdownItem>
							<DropdownItem>Download</DropdownItem>
						</Dropdown>
					</div>
				</td>
			</tr>
			<tr className='h-4'></tr>
		</React.Fragment>
	)
}

export default AlbumListItem
