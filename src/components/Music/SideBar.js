import React from 'react'
import { BsSearch, BsPlusSquare, BsHeart } from 'react-icons/bs'
import { IoBookmarksOutline, IoHomeOutline } from 'react-icons/io5'
import { Link, useLocation, useParams } from 'react-router-dom'
import logo from '../../assets/images/logo128.png'
const SideBar = () => {
	const MenuLink = [
		{
			id: 1,
			path: '/',
			text: 'Home',
			Icon: IoHomeOutline,
		},
		{
			id: 2,
			path: '/search',
			text: 'Search',
			Icon: BsSearch,
		},
		{
			id: 3,
			path: '/your-library',
			text: 'Your Library',
			Icon: IoBookmarksOutline,
		},
		{
			id: 4,
			path: '/create-playlist',
			text: 'Create Playlist',
			Icon: BsPlusSquare,
		},
		{
			id: 5,
			path: '/liked-song',
			text: 'Liked song',
			Icon: BsHeart,
		},
	]
	const location = useLocation()

	const active = (path) => {
		return location.pathname === path
	}

	return (
		<div
			className='w-full h-20  md:w-80 md:h-screen bg-gray-800  text-white fixed 
			bottom-0 border-gray-700 border-r border-t z-10'
		>
			<div className='p-8 md:flex items-center hidden'>
				<img src={logo} alt='logo_icon' className='w-10 mr-4' />
				<Link
					to='/'
					className='text-2xl font-semibold text-green-400 cursor-pointer'
				>
					Spotify
				</Link>
			</div>
			{/* // Mobile view  */}
			<ul className='flex md:hidden w-full h-full justify-between items-center px-4'>
				{MenuLink.map((Item) => (
					<div key={Item.id}>
						<Link to={`${Item.path}`} title={Item.text}>
							<li
								className={`flex flex-col text-sm items-center py-2 px-4 duration-700 
								hover:bg-slate-700 cursor-pointer rounded ${
									active(Item.path) ? `bg-green-500` : null
								}`}
							>
								<Item.Icon className='text-lg' />
								<span className='mt-2 hidden sm:block '>
									{Item.text}
								</span>
							</li>
						</Link>
					</div>
				))}
			</ul>
			{/* // Desktop view  */}
			<ul className='p-4 md:block hidden'>
				{MenuLink.map((Item, index) => (
					<div key={Item.id}>
						<Link to={`${Item.path}`} title={Item.text}>
							<li
								className={`flex items-center py-2 px-4 duration-700 
							hover:bg-slate-700 cursor-pointer mb-2 rounded ${
								active(Item.path) ? `bg-slate-700` : null
							}`}
							>
								<Item.Icon />
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
