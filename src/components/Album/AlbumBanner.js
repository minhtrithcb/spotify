import React from 'react'
import { useSelector } from 'react-redux'
const AlbumBanner = () => {
	const { albumInfo, isPlaying, currentSong } = useSelector(
		(state) => state.music
	)
	const checkIsPlayingOnAlbum = () => {
		return isPlaying && currentSong?.albumId + '' === albumInfo?.id
	}
	return (
		<div className='overflow-hidden relative w-full flex items-center h-[200px] md:h-[300px] bg-gradient-to-r from-green-500 to-teal-500 rounded-lg'>
			<img
				src={albumInfo?.banner}
				crossOrigin='anonymous'
				alt='banner'
				className='w-full h-full object-cover absolute'
			/>
			<div
				className={`z-10 hidden xs:block w-[100px] md:w-[150px] h-[100px] shadow-xl mx-4 
                overflow-hidden md:h-[150px] bg-gradient-to-r from-green-700 to-teal-700 
                ${checkIsPlayingOnAlbum() ? 'rounded-full' : 'rounded-lg '}`}
			>
				<img
					crossOrigin='anonymous'
					src={albumInfo?.thumbnail}
					alt='thumbnail'
					className={`w-full h-full object-cover 
                    ${checkIsPlayingOnAlbum() && 'diskSpinPlay rounded-full'}`}
				/>
			</div>
			<div className='p-4 z-10 backdrop-blur-sm rounded bg-black/30'>
				<p className='uppercase tracking-[5px] text-xs'>
					Public playlist
				</p>
				<h1 className='text-2xl md:text-4xl lg:text-5xl font-bold py-2'>
					{albumInfo?.album}
				</h1>
				<p className='py-2'>
					{albumInfo?.artists.map((a) => a)}{' '}
					<small className='opacity-80'>and more</small>
				</p>
				<p>
					<small className='opacity-80'>Made for </small> Trivo .{' '}
					{albumInfo?.playList.length} song .{' '}
					<small className='opacity-80'>2hr 45min </small>
				</p>
			</div>
		</div>
	)
}

export default AlbumBanner
