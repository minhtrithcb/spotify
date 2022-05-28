import React from 'react'
import AlbumBanner from './AlbumBanner'
import AlbumList from './AlbumList'
import AlbumPlayer from './AlbumPlayer'

const Album = () => {
	return (
		<div className='text-white w-full'>
			<AlbumBanner />
			<AlbumPlayer />
			<AlbumList />
		</div>
	)
}

export default Album
