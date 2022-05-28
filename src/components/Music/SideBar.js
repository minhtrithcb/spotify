import React from 'react'
import { BsSearch, BsPlusSquare, BsHeart } from 'react-icons/bs'
import { IoBookmarksOutline, IoHomeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo128.png'
const SideBar = () => {
	const MenuLink = [
		{
			id: 1,
			path: '/',
			text: 'Home',
			icon: IoHomeOutline,
		},
		{
			id: 2,
			path: '/search',
			text: 'Search',
			icon: BsSearch,
		},
		{
			id: 3,
			path: '/your-library',
			text: 'Your Library',
			icon: IoBookmarksOutline,
		},
		{
			id: 4,
			path: '/create-playlist',
			text: 'Create Playlist',
			icon: BsPlusSquare,
		},
		{
			id: 5,
			path: '/liked-song',
			text: 'Liked song',
			icon: BsHeart,
		},
	]

	return (
		<div
			className='w-80 bg-gray-800 text-white h-screen fixed left-0 top-0
			border-gray-700 border-r'
		>
			<div className='p-8 flex items-center'>
				<img src={logo} alt='logo_icon' className='w-10 mr-4' />
				<Link
					to='/'
					className='text-2xl font-semibold text-green-400 cursor-pointer'
				>
					Spotify
				</Link>
			</div>
			<ul className='p-4'>
				{MenuLink.map((Item, index) => (
					<div key={Item.id}>
						<Link to={`${Item.path}`}>
							<li
								className='flex items-center text-base py-2 px-4 duration-700 
							hover:bg-slate-700 cursor-pointer mb-2 rounded'
							>
								<Item.icon />
								<span className='ml-4'>{Item.text}</span>
							</li>
						</Link>
						{index === 2 && (
							<hr className='border-gray-700 w-[calc(320px_-_4em)] ml-4 my-4' />
						)}
					</div>
				))}
			</ul>
		</div>
	)
}

export default SideBar
