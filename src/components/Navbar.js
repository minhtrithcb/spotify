import React, { useRef, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'
import useOutsite from '../hooks/useOutsite'
const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	useOutsite(menuRef, () => setIsOpen(false))

	return (
		<div
			className='w-full top-0 fixed h-16 flex 
            justify-between items-center px-4 bg-orange-100
            border-b-2 z-50
        '
		>
			<p>Welcome back, Trí</p>
			<span
				className='w-[40px] h-[40px] duration-700
                cursor-pointer flex items-center justify-center 
            '
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<HiMenuAlt3 />
			</span>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames='menu'
				unmountOnExit
				nodeRef={menuRef}
			>
				<div
					className='bg-orange-300  absolute right-0 top-16 w-[150px]
                cursor-pointer p-2 rounded-md shadow-md
            '
					ref={menuRef}
				>
					<ul>
						<li className='p-2 duration-300 rounded-md hover:bg-orange-200 flex items-center'>
							<AiOutlineUser className='mr-4' />
							Hồ sơ
						</li>
						<li className='p-2 duration-300 rounded-md hover:bg-orange-200 flex items-center'>
							<AiOutlineLogout className='mr-4' />
							Thoát
						</li>
					</ul>
				</div>
			</CSSTransition>
		</div>
	)
}

export default Navbar
