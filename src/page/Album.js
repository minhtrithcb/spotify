import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AlbumBanner from '../components/Album/AlbumBanner'
import AlbumList from '../components/Album/AlbumList'
import AlbumPlayer from '../components/Album/AlbumPlayer'
import { Album as list } from '../Db/Album'
import { useDispatch } from 'react-redux'
import { setAlbum } from '../redux/slice/musicSlice'

const Album = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// Get album by id
	useEffect(() => {
		const found = list.find((item) => item.id === id)
		if (!found) return navigate('/not-found', { replace: true })
		dispatch(setAlbum(found))
	}, [id, dispatch, navigate])

	return (
		<div className='text-white w-full p-2 lg:p-4'>
			<AlbumBanner />
			<AlbumPlayer />
			<AlbumList />
		</div>
	)
}

export default Album
