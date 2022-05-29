import React from 'react'
import Dropdown, { DropdownItem } from '../common/Dropdown'
import { BsThreeDotsVertical, BsFillGearFill } from 'react-icons/bs'
const AlbumList = () => {
	// const listMusic = [
	// 	{
	// 		id: 1,
	// 		title: 'Song one',
	// 		album: 'Malcolm Lockyer',
	// 		artist: 'Malcolm Lockyer',
	// 		year: 1961,
	// 	},
	// ]
	return (
		<div className='w-full md:p-4'>
			<table className='table-fixed w-full '>
				<thead className='border-b border-b-gray-700 my-4'>
					<tr className='text-left uppercase py-4'>
						<th className='w-10 text-center'>#</th>
						<th className='py-4 sm:w-2/5'>Song</th>
						<th className='w-0 sm:w-[calc(40%_-_40px)] opacity-0 sm:opacity-100'>
							Album
						</th>
						<th className='w-1/5 sm:w-[calc(40%_-_40px)] pr-4 sm:pr-0'>
							Time
						</th>
						<th className='w-10 pr-4'>
							<div className='w-full flex justify-center'>
								<BsFillGearFill />
							</div>
						</th>
					</tr>
				</thead>
				<tbody className='h-4'></tbody>
				<tbody>
					{[1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 7].map((i, j) => (
						<tr
							className='cursor-pointer duration-300 hover:bg-slate-700'
							key={j}
						>
							<td className='w-12 text-center rounded-l-lg'>1</td>
							<td className='py-4'>
								<div className='flex items-center'>
									<div className='hidden rounded lg:block mr-4 bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10'></div>
									<div>
										<p className='whitespace-nxowrap '>
											The Sliding Mr. Bones
										</p>
										<small>Artist</small>
									</div>
								</div>
							</td>
							<td className='opacity-0 sm:opacity-100 '>
								Malcolm Lockyer
							</td>
							<td>3:20</td>

							<td className='w-12 rounded-r-lg text-right sm:text-left pr-4'>
								<div className='w-full flex justify-center'>
									<Dropdown
										positionDown={i === 7 ? true : false}
										title={
											<div className='w-8 h-8 flex justify-center items-center hover:bg-slate-600 duration-300 rounded-full'>
												<BsThreeDotsVertical />
											</div>
										}
									>
										<DropdownItem>
											Add to playlist
										</DropdownItem>

										<DropdownItem>Share</DropdownItem>
									</Dropdown>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AlbumList
