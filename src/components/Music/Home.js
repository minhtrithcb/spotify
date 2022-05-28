import React from 'react'
import TitleBar from '../common/TitleBar'
import AlbumItem from './AlbumItem'
const Home = () => {
	const List1 = [
		{
			id: 1,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 2,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 3,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 4,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 5,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 6,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
		{
			id: 7,
			album: 'Daily Mix',
			artists: ['a', 'b', 'c'],
		},
	]
	return (
		<div className='h-auto w-full'>
			<TitleBar />
			<ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
				{List1.map((album) => (
					<AlbumItem data={album} key={album.id} />
				))}
			</ul>
		</div>
	)
}

export default Home
