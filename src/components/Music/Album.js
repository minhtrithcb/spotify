import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumBanner from './AlbumBanner'
import AlbumList from './AlbumList'
import AlbumPlayer from './AlbumPlayer'
import { Album as list } from '../../Db/Album'
import { useDispatch, useSelector } from 'react-redux'
import { setAlbum } from '../../redux/slice/musicSlice'

const Album = () => {
	const { id } = useParams()
	const navi = useNavigate()
	const dispatch = useDispatch()
	const { albumInfo } = useSelector((state) => state.music)

	useEffect(() => {
		const found = list.find((item) => item.id === id)
		if (!found) return navi('/not-found', { replace: true })
		dispatch(setAlbum(found))
	}, [id, dispatch, navi])

	return (
		<div className='text-white w-full p-2 lg:p-4'>
			<AlbumBanner />
			<AlbumPlayer />
			<AlbumList list={albumInfo?.playList} />
		</div>
	)
}

export default Album
