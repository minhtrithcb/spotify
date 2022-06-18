import React from 'react'

const Tab = ({ children }) => {
	return <div className='flex w-full'>{children}</div>
}

export const TabItem = ({ title, active, ...rest }) => {
	return (
		<div
			{...rest}
			className={`px-4 py-1 cursor-pointer select-none
                rounded duration-300 mx-1 flex-1 text-center  
                ${active && 'bg-slate-800'}
            `}
		>
			{title}
		</div>
	)
}

export default Tab
