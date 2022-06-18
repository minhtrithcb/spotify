import React, { useEffect, useRef } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import AlbumListItem from './AlbumListItem'

const AlbumList = () => {
	const { searchPlayList, indexSong, cursorIndexSong, albumInfo } =
		useSelector((state) => state.music)
	const foundSongRef = useRef(null)
	const followByIndexSongRef = useRef(null)

	// trigger scroll every searchPlayList & cursorIndexSong change
	useEffect(() => {
		if (foundSongRef.current) {
			foundSongRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		}
	}, [searchPlayList, cursorIndexSong])

	// trigger scroll every change song
	useEffect(() => {
		if (followByIndexSongRef.current) {
			followByIndexSongRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		}
	}, [indexSong])

	return (
		<div className='w-full'>
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
				<tbody>
					{albumInfo?.playList?.map((music, index) => (
						<AlbumListItem
							key={index}
							music={music}
							index={index}
							foundSongRef={foundSongRef}
							followByIndexSongRef={followByIndexSongRef}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AlbumList
