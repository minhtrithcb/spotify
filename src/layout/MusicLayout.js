import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Music/NavBar'
import SideBar from '../components/Music/SideBar'

const MusicLayout = () => {
	return (
		<div className='h-screen w-full'>
			<Navbar />
			<SideBar />
			<div className='pt-20 px-4 bg-slate-800 ml-80 w-[calc(100%_-_320px)] h-full'>
				<Outlet />
			</div>
		</div>
	)
}

export default MusicLayout
