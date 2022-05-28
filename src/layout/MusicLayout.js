import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Music/NavBar'
import SideBar from '../components/Music/SideBar'

const MusicLayout = () => {
	return (
		<div className='h-screen w-full '>
			<Navbar />
			<SideBar />
			<div
				className='overflow-y-auto scrollBar pt-20 pl-4 pb-10
				pr-2 bg-slate-800 md:ml-80 w-full md:w-[calc(100%_-_320px)] h-[calc(100%_-_5rem)] md:h-full'
			>
				<Outlet />
			</div>
		</div>
	)
}

export default MusicLayout
