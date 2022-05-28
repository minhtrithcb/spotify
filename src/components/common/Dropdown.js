import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useOutsite from '../../hooks/useOutsite'

const Dropdown = ({ title, children, styleBtn, styleDropdown }) => {
	const [isOpen, setIsOpen] = useState(false)

	const menuRef = useRef(null)
	useOutsite(menuRef, () => setIsOpen(false))

	return (
		<div className='relative flex items-center'>
			<button
				type='button'
				onClick={() => setIsOpen((prev) => !prev)}
				className={`z-10 ${styleBtn}`}
			>
				{title || 'Title'}
			</button>
			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames='menu'
				unmountOnExit
				nodeRef={menuRef}
			>
				<div
					className={`bg-gray-700 z-20  absolute right-0 top-14 min-w-[200px]
                    cursor-pointer p-2 rounded-md shadow-xl ${styleDropdown}`}
					ref={menuRef}
				>
					<ul>{children}</ul>
				</div>
			</CSSTransition>
		</div>
	)
}

export const DropdownItem = ({ style, children }) => {
	return (
		<li
			className={`p-2  duration-300 rounded-md hover:bg-slate-600	
            flex items-center ${style}`}
		>
			{children}
		</li>
	)
}

export default Dropdown
