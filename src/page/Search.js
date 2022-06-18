import axios from 'axios'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
	const [fileMp3, setFileMp3] = useState(null)

	const handleUpload = () => {
		if (fileMp3 === null) return
		const formData = new FormData()
		formData.append('file', fileMp3)
		formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)

		axios
			.post(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/upload`,
				formData
			)
			.then((res) => {
				console.log(res)
			})
	}

	return (
		<div className='mb-4 relative text-white'>
			<BsSearch className='absolute top-3 left-3' />
			<input
				type='text'
				placeholder='Search playlist'
				spellCheck={false}
				className={`pl-10 h-10 duration-300 outline-none transition-all
				bg-slate-600 rounded text-white w-full mb-4`}
			/>

			<input
				type='file'
				onChange={(e) => setFileMp3(e.target.files[0])}
			/>
			<button onClick={handleUpload} className='bg-green-500 p-2'>
				Upload
			</button>
		</div>
	)
}

export default Search
