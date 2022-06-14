import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import MusicPlayer from '../components/Music/MusicPlayer'
import Navbar from '../components/Music/NavBar'
import SideBar from '../components/Music/SideBar'

const MusicLayout = () => {
	const { currentSong } = useSelector((state) => state.music)

	return (
		<div className='h-screen w-full bg-slate-800'>
			<Navbar />
			<SideBar />
			<div
				className={`overflow-y-auto overflow-x-hidden scrollBar pt-20
				${currentSong !== null ? 'pb-40' : ''} pr-1 bg-slate-800 lg:ml-80 w-full 
				lg:w-[calc(100%_-_320px)] h-[calc(100%_-_5rem)] lg:h-full`}
			>
				<Outlet />
			</div>
			<MusicPlayer />
		</div>
	)
}

export default MusicLayout
