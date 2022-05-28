import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Searchbar = () => {
	return (
		<div className='mb-4 relative'>
			<BsSearch className='absolute top-3 left-3' />
			<input
				type='text'
				placeholder='Hãy nhập tên cần tìm'
				className=' h-10 pl-10 
            border-2 outline-none focus:ring-1 w-full 
        '
			/>
		</div>
	)
}

export default Searchbar
