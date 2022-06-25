import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useOutsite from '../../hooks/useOutsite'

const Dropdown = ({
	title,
	children,
	styleBtn,
	styleDropdown,
	positionY,
	positionX,
	getHoverStatus, // recive user click this element
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	// Click outsite dropdown
	useOutsite(menuRef, () => {
		getHoverStatus && getHoverStatus(false)
		setIsOpen(false)
	})

	// On click on dropdown button
	const handleClick = (e) => {
		e.stopPropagation()
		getHoverStatus && getHoverStatus(true)
		setIsOpen((prev) => !prev)
	}

	return (
		<div className='relative flex items-center'>
			<button
				type='button'
				onClick={handleClick}
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
					className={`bg-gray-700 z-20  absolute min-w-[200px]
                    cursor-pointer p-2 rounded-md shadow-xl 
					${positionX ? 'left-0' : 'right-0'}
					${positionY ? 'bottom-0' : 'top-14'} 
					${styleDropdown}`}
					ref={menuRef}
				>
					<ul>{children}</ul>
				</div>
			</CSSTransition>
		</div>
	)
}

export const DropdownItem = ({ style, children, ...rest }) => {
	return (
		<li
			className={`p-2  duration-300 rounded-md hover:bg-slate-600	
            flex items-center ${style}`}
			onClick={(e) => e.stopPropagation()}
			{...rest}
		>
			{children}
		</li>
	)
}

export default Dropdown
