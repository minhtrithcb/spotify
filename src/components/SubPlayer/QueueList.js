import React, { useEffect, useRef } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import QueueListItem from './QueueListItem'

const QueueList = () => {
	const { indexSong, playListQueue } = useSelector((state) => state.music)
	const followByIndexSongRef = useRef(null)

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
						<th>Song</th>
						<th className='w-10 pr-4'>
							<div className='w-full flex justify-center'>
								<BsFillGearFill />
							</div>
						</th>
					</tr>
				</thead>
				<tbody className='h-4'></tbody>
				<tbody>
					{playListQueue?.map((music, index) => (
						<QueueListItem
							key={index}
							music={music}
							index={index}
							followByIndexSongRef={followByIndexSongRef}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default QueueList
