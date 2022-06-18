import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo128.png'
import { NAVIGATE_LINK } from '../../router'

const SideBar = ({ toggleSideBar, settoggleSideBar }) => {
	const location = useLocation()
	const active = (path) => location.pathname === path

	return (
		<div
			className={`lg:h-screen bg-gray-800  text-white fixed w-full
			bottom-0 border-gray-700 border-r border-t z-[999] lg:z-10 navbar
			${toggleSideBar ? 'lg:w-20' : 'lg:w-80'}`}
		>
			<div
				className={`${
					toggleSideBar ? 'py-8 justify-center' : 'p-8'
				} lg:flex items-center hidden `}
			>
				<img src={logo} alt='logo_icon' className='w-10 select-none' />
				{!toggleSideBar && (
					<Link
						to='/'
						className='text-2xl font-semibold text-green-400 cursor-pointer ml-4 select-none'
					>
						Spotify
					</Link>
				)}
				<span
					onClick={() => settoggleSideBar((prev) => !prev)}
					className='w-7 absolute -right-8 bottom-1/2 translate-y-1/2 btn__navbar opacity-0
					h-7 cursor-pointer duration-300 flex justify-center items-center bg-gray-600 rounded-full mr-4'
				>
					{!toggleSideBar ? (
						<IoIosArrowBack />
					) : (
						<IoIosArrowForward />
					)}
				</span>
			</div>
			{/* // Mobile view  */}
			<ul className='flex lg:hidden w-full h-full justify-between items-center px-4 py-2'>
				{NAVIGATE_LINK.map((Item) => (
					<div key={Item.id}>
						<Link to={`${Item.path}`} title={Item.text}>
							<li
								className={`flex flex-col text-sm items-center py-2 px-4 duration-700 
								hover:bg-slate-700 cursor-pointer rounded ${
									active(Item.path) ? `bg-green-600` : null
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
			<ul className='p-4 lg:block hidden'>
				{NAVIGATE_LINK.map((Item, index) => (
					<div key={Item.id}>
						<Link to={`${Item.path}`} title={Item.text}>
							<li
								className={`flex items-center px-4 duration-700 select-none
								hover:bg-slate-700 cursor-pointer rounded group
								${toggleSideBar ? 'mb-10 py-4' : 'mb-2 py-2'}
								${active(Item.path) && `bg-slate-700`}`}
							>
								<Item.Icon />
								<span
									className={`ml-4 ${
										toggleSideBar &&
										`absolute whitespace-nowrap ml-16 bg-slate-600 px-4 py-2 
										text-sm rounded scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-300`
									}`}
								>
									{Item.text}
								</span>
							</li>
						</Link>
						{index === 2 && !toggleSideBar && (
							<hr className='border-gray-700 w-[calc(320px_-_4em)] ml-4 my-4' />
						)}
					</div>
				))}
			</ul>
		</div>
	)
}

export default SideBar
