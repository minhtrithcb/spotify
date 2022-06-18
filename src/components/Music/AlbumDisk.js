import React, { useRef, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Tab, { TabItem } from '../common/Tab'
import AlbumDiskList from './AlbumDiskList'
import AlbumDiskInfo from './AlbumDiskInfo'

const AlbumDisk = () => {
	const { isOpenDisk } = useSelector((state) => state.music)
	const nodeRef = useRef(null)
	const [index, setIndex] = useState(1)

	return (
		<CSSTransition
			in={isOpenDisk}
			timeout={300}
			classNames='slideY'
			unmountOnExit
			nodeRef={nodeRef}
		>
			<div
				className='fixed w-full h-[calc(100vh_-_240px)] p-4 flex-col lg:left-4 lg:overflow-y-hidden
				lg:h-[500px] lg:bottom-36 lg:bg-slate-600 lg:top-auto lg:w-[450px] lg:rounded-lg 
				items-center top-0 left-0 bg-gray-800 z-50 text-white '
				ref={nodeRef}
			>
				<div className='flex justify-between items-center w-full h-10 bg-slate-700 z-50 rounded-md mb-4 '>
					<Tab>
						<TabItem
							title={'Playing'}
							onClick={() => setIndex(1)}
							active={index === 1}
						/>
						<TabItem
							title={'Playlist'}
							onClick={() => setIndex(2)}
							active={index === 2}
						/>
						<TabItem
							title={'Lyris'}
							onClick={() => setIndex(3)}
							active={index === 3}
						/>
					</Tab>
				</div>

				<div className='pr-2 h-[calc(100vh_-_320px)] lg:h-[400px] overflow-y-auto scrollBar overflow-x-hidden'>
					{index === 1 && <AlbumDiskInfo />}
					{index === 2 && <AlbumDiskList />}
				</div>
			</div>
		</CSSTransition>
	)
}

export default memo(AlbumDisk)
