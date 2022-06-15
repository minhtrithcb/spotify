import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlbum, setMusic } from '../../redux/slice/musicSlide'

const AlbumItem = ({ album }) => {
	const dispatch = useDispatch()

	const handlePlayAlbum = () => {
		dispatch(setAlbum(album))

		dispatch(
			setMusic({
				albumPlayList: album?.playList,
				currentSong: album?.playList[0],
				indexSong: 0,
			})
		)
	}

	return (
		<li
			className='h-[210px] bg-slate-700 text-white rounded-md p-2 
            hover:bg-slate-600 duration-300 cursor-pointer relative group '
		>
			<div className='h-[130px] overflow-hidden rounded-md w-full shadow-md bg-gradient-to-r from-green-500 to-teal-500'>
				<img
					src={album?.thumbnail}
					className='w-full h-full object-cover'
					alt='thumbnail'
				/>
			</div>
			<Link to={`/album/${album?.id}`} className='font-bold mt-2 block'>
				{album?.album}
			</Link>
			{album?.artists.map((a) => a)}
			<span
				onClick={handlePlayAlbum}
				className='absolute w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 bottom-16 opacity-0 text-black shadow-md
                    group-hover:opacity-100
                    group-hover:bottom-20'
			>
				<FaPlay />
			</span>
		</li>
	)
}

export default AlbumItem
