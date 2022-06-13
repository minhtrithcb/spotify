import React, { useEffect, useRef } from 'react'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import { BsThreeDotsVertical, BsFillGearFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setMusic } from '../../redux/slice/musicSlide'
import Wave from '../common/Wave'
import { subString } from '../../helper/helper'

const AlbumList = () => {
	const { albumInfo, searchPlayList, currentSong, isPlaying } = useSelector(
		(state) => state.music
	)
	const dispatch = useDispatch()
	const tbodyRef = useRef(null)
	const foundSongRef = useRef(null)

	// User chose song in album set playList & index Song
	const handleChoseMusic = (music, index) => {
		dispatch(
			setMusic({
				albumPlayList: albumInfo?.playList,
				currentSong: music,
				indexSong: index,
			})
		)
	}

	// Add hover class on click
	const onHoverItem = (e, clear) => {
		// if user not chose clear all
		if (clear) return removeTbodyClass()
		const trElement = e.closest('tr')
		removeTbodyClass()
		trElement.classList.add('bg-slate-700')
	}

	// // Remove all hover class on tr
	const removeTbodyClass = () => {
		for (let i = 0; i < tbodyRef.current.children.length; i++) {
			const element = tbodyRef.current.children[i]
			element.classList.remove('bg-slate-700')
		}
	}

	// trigger scroll every searchPlayList change
	useEffect(() => {
		if (foundSongRef.current) {
			foundSongRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [searchPlayList])

	return (
		<div className='w-full md:p-4'>
			<table className='table-fixed w-full '>
				<thead className='border-b border-b-gray-700 my-4'>
					<tr className='text-left uppercase py-4'>
						<th className='w-10 text-center'>#</th>
						<th className='py-4 sm:w-2/5'>Song</th>
						<th className='w-0 sm:w-[calc(40%_-_40px)] opacity-0 xl:opacity-100'>
							Album
						</th>
						<th className='w-1/5 sm:w-[calc(40%_-_40px)] pr-4 opacity-0 lg:opacity-100'>
							Time
						</th>
						<th className='w-10 pr-4'>
							<div className='w-full flex justify-center'>
								<BsFillGearFill />
							</div>
						</th>
					</tr>
				</thead>
				<tbody className='h-4'></tbody>
				<tbody ref={tbodyRef}>
					{albumInfo?.playList.map((music, index) => (
						<React.Fragment key={index}>
							<tr
								className={`cursor-pointer duration-300 hover:bg-slate-700
									${
										searchPlayList?.find((i) =>
											i.title.includes(music.title)
										)
											? ' bg-teal-600'
											: ''
									}
								${currentSong?.title === music.title ? 'bg-slate-700' : ''}
							`}
								ref={
									searchPlayList[0]?.title === music.title
										? foundSongRef
										: null
								}
								onClick={() => handleChoseMusic(music, index)}
							>
								{/* // id is not unique so use title  */}
								<td className='w-12 text-center rounded-l-lg'>
									{index + 1}
								</td>
								<td className='py-4'>
									<div className='flex items-center'>
										{currentSong?.title === music.title &&
										isPlaying ? (
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
								<td className='opacity-0 xl:opacity-100'>
									{albumInfo?.album}
								</td>
								<td className='opacity-0 lg:opacity-100'>
									3:20
								</td>
								<td className='w-12 rounded-r-lg text-right sm:text-left pr-4'>
									<div className='w-full flex justify-center'>
										<Dropdown
											positionY={
												index ===
												albumInfo?.playList.length - 1
													? true
													: false
											}
											title={
												<div className='w-8 h-8 flex justify-center items-center hover:bg-slate-600 duration-300 rounded-full'>
													<BsThreeDotsVertical />
												</div>
											}
											getHoverItem={onHoverItem}
										>
											<DropdownItem>
												Add to playlist
											</DropdownItem>

											<DropdownItem>Share</DropdownItem>
										</Dropdown>
									</div>
								</td>
							</tr>
							<tr className='h-4'></tr>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AlbumList
