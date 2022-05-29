import React, { useRef, useState } from 'react'
import { FaPlay, FaRegHeart } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { BsDownload, BsSearch } from 'react-icons/bs'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import useOutsite from '../../hooks/useOutsite'

const AlbumPlayer = () => {
	const [isOpenSearch, setIsOpenSearch] = useState(false)
	const inputRef = useRef(null)
	useOutsite(inputRef, () => setIsOpenSearch(false))

	return (
		<div className='sticky mt-2 top-0 h-14 bg-slate-800 flex items-center justify-between px-0 z-30 md:px-4'>
			<div className='flex'>
				<span
					className='w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 text-black shadow-md cursor-pointer'
				>
					<FaPlay />
				</span>
				<span
					className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
                    rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
				>
					<FaRegHeart />
				</span>
				<span
					className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
                    rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
				>
					<BsDownload />
				</span>
			</div>

			<div className='flex items-center '>
				<div
					className={`relative text-black mr-4 transition-all ${
						!isOpenSearch ? 'w-10' : 'w-52'
					} `}
				>
					<div
						className='text-white flex items-center justify-center 
						absolute top-0 left-0 cursor-pointer bg-transparent h-10 w-10'
						onClick={() => {
							inputRef.current.focus()
							setIsOpenSearch((prev) => !prev)
						}}
					>
						<BsSearch />
					</div>
					<input
						type='text'
						ref={inputRef}
						placeholder='Search playlist'
						className={`pl-10 h-10 duration-300 outline-none transition-all
						bg-slate-600 rounded text-white ${isOpenSearch ? 'w-full' : 'w-[0%] '}`}
					/>
				</div>
				<Dropdown
					title={
						<div className='w-auto h-10 rounded p-2 flex items-center justify-end duration-300 bg-slate-600'>
							<span className='md md:mr-2 text-sm md:text-base'>
								Sort by
							</span>
							<IoMdArrowDropdown className='hidden md:block' />
						</div>
					}
				>
					<DropdownItem>Title</DropdownItem>
					<DropdownItem>Artist</DropdownItem>
					<DropdownItem>Album</DropdownItem>
					<DropdownItem>Date added</DropdownItem>
					<DropdownItem>Duration</DropdownItem>
				</Dropdown>
			</div>
		</div>
	)
}

export default AlbumPlayer
