import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { subString } from '../../helper/helper'
import { setMusic } from '../../redux/slice/musicSlice'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import Wave from '../common/Wave'

const QueueListItem = ({ music, index, followByIndexSongRef }) => {
	const dispatch = useDispatch()
	const [activeClickDropdown, setactiveClickDropdown] = useState(false)
	const { albumInfo, currentSong, isPlaying, indexSong } = useSelector(
		(state) => state.music
	)

	// // User chose song in album set playList & index Song
	const handleChoseMusic = () => {
		dispatch(
			setMusic({
				albumPlayList: albumInfo?.playList,
				currentSong: music,
				indexSong: index,
				playListQueue: albumInfo?.playList,
			})
		)
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
			    ${activeClickDropdown ? 'bg-slate-700' : ''}`}
				onClick={handleChoseMusic}
			>
				<td
					className='w-12 text-center rounded-l-lg'
					ref={index === indexSong ? followByIndexSongRef : null}
				>
					{index + 1}
				</td>
				<td className='py-4'>
					<div className='flex items-center'>
						{currentSong?.title === music.title && isPlaying ? (
							<div className='w-10 h-10 flex mr-4 flex-shrink-0'>
								<Wave />
							</div>
						) : (
							<div
								className='rounded block mr-4 bg-gradient-to-r 
                        		from-green-500 to-teal-500 w-10 h-10 flex-shrink-0'
							></div>
						)}
						<div>
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
							<small>{music?.artists}</small>
						</div>
					</div>
				</td>

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

export default QueueListItem
