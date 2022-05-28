import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Dropdown, { DropdownItem } from '../Dropdown'

const NavBar = () => {
	return (
		<div
			className='bg-gray-800 text-white flex justify-between py-4 px-10
			fixed top-0 right-0 w-[calc(100%_-_320px)] z-10 '
		>
			<div className='flex '>
				<span className='w-7 h-7 cursor-pointer duration-300 flex justify-center items-center bg-gray-600 hover:bg-gray-800 rounded-full mr-4'>
					<IoIosArrowBack />
				</span>
				<span className='w-7 h-7 cursor-pointer duration-300 flex justify-center items-center bg-gray-600 hover:bg-gray-800 rounded-full'>
					<IoIosArrowForward />
				</span>
			</div>

			<div className='flex justify-between'>
				<button className='px-6 mr-4 rounded-3xl border border-white'>
					Upgrade
				</button>
				<Dropdown title={<div>tri vo</div>}>
					<DropdownItem>Account</DropdownItem>
					<DropdownItem>Profile</DropdownItem>
					<DropdownItem>Upgrade to Premium</DropdownItem>
					<DropdownItem>Private session</DropdownItem>
					<DropdownItem>Setting</DropdownItem>
					<DropdownItem>Log out</DropdownItem>
				</Dropdown>
			</div>
		</div>
	)
}

export default NavBar
