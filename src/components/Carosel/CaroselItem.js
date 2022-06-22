import React from 'react'

const CaroselItem = ({
	data: {
		src,
		title,
		subTitle,
		btnText,
		totalSong,
		totalDuration,
		type,
		description,
	},
}) => {
	return (
		<div
			className='bg-gradient-to-r from-green-500 to-teal-500 
            rounded-lg h-72 overflow-hidden relative'
		>
			<img
				crossOrigin='anonymous'
				className='w-full h-full object-cover'
				srcSet={src}
				alt='banner_'
			/>

			<div className='absolute top-0 h-full left-0 w-full md:w-[350px] backdrop-blur-sm bg-white/30 '>
				<p className='px-4 pt-4 text-sm tracking-[3px]'>{subTitle}</p>
				<p className='p-4 text-3xl'>{title}</p>
				<small className='px-4 inline-block'>{description}</small>

				<button
					className='ml-4 mt-4 px-4 py-1 bg-transparent border block
                    rounded-full duration-300 hover:bg-green-500 hover:border-transparent'
				>
					{btnText}
				</button>

				{type === 'album' && (
					<small className='absolute right-4 bottom-4'>
						{totalSong} song. {totalDuration}
					</small>
				)}
			</div>
		</div>
	)
}

export default CaroselItem
