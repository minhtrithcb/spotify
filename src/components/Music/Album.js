import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumBanner from './AlbumBanner'
import AlbumList from './AlbumList'
import AlbumPlayer from './AlbumPlayer'
import { Album as list } from '../../Db/Album'
import { useDispatch } from 'react-redux'
import { setAlbum } from '../../redux/slice/musicSlide'

const Album = () => {
	const { id } = useParams()
	const navi = useNavigate()
	const dispatch = useDispatch()
	useEffect(() => {
		const found = list.find((item) => item.id === id)
		if (!found) return navi('/not-found', { replace: true })
		dispatch(setAlbum(found))
	}, [id, dispatch, navi])

	return (
		<div className='text-white w-full'>
			<AlbumBanner />
			<AlbumPlayer />
			<AlbumList />
		</div>
	)
}

export default Album
