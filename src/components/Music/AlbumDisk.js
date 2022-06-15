import React, { useRef, memo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Tab, { TabItem } from '../common/Tab'
import AlbumList from './AlbumList'
import MusicDiskInfo from './MusicDiskInfo'

const AlbumDisk = ({ isOpen }) => {
	const nodeRef = useRef(null)
	const [index, setIndex] = useState(1)
	const onChoseTab = (index) => {
		console.log(index)
	}

	return (
		<CSSTransition
			in={isOpen}
			timeout={300}
			classNames='slideY'
			unmountOnExit
			nodeRef={nodeRef}
		>
			<div
				className='fixed w-full h-[calc(100vh_-_240px)] p-4 flex-col items-center top-0 left-0 bg-gray-800 z-50 text-white'
				ref={nodeRef}
			>
				<div className='flex justify-between items-center w-full h-10 bg-slate-700 z-50 rounded-md mb-4'>
					<Tab onChoseTab={onChoseTab}>
						<TabItem
							title={'Playing'}
							onClick={() => setIndex(1)}
							active={index === 1}
						/>
						<TabItem
							title={'Play list'}
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
				{index === 1 && <MusicDiskInfo />}
				<div className='pr-2 max-h-[500px] mb-8 overflow-y-auto scrollBar overflow-x-hidden'>
					{index === 2 && <AlbumList />}
				</div>
			</div>
		</CSSTransition>
	)
}

export default memo(AlbumDisk)
