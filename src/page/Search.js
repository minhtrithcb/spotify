import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
	return (
		<div className='mb-4 relative text-white p-4'>
			<p>search page</p>
			<div className='relative hidden'>
				<BsSearch className='absolute top-3 left-3' />
				<input
					type='text'
					placeholder='Search playlist'
					spellCheck={false}
					className={`pl-10 h-10 duration-300 outline-none transition-all
				bg-slate-600 rounded text-white w-full mb-4`}
				/>
			</div>
		</div>
	)
}

export default Search
