import React from "react";
import { subString } from "../../helper/helper";
import { useSelector } from "react-redux";

const Disk = () => {
    const { albumInfo, currentSong, isPlaying } = useSelector(
        (state) => state.music
    );

    return (
        <React.Fragment>
            <div
                className={`w-[200px] h-[200px] relative
					lg:w-[200px] lg:h-[200px] overflow-hidden shadow-2xl shadow-green-500/30
                    bg-gradient-to-r from-green-700 to-teal-700 mt-8 rounded-full duration-700 mx-auto ${
                        isPlaying ? "diskSpinPlay" : "diskSpinPaused "
                    }`}
            >
                <img
                    crossOrigin='anonymous'
                    src={albumInfo?.thumbnail}
                    alt='thumbnail'
                    className='w-full h-full object-cover '
                />
                <div
                    className='w-[70px] h-[70px] rounded-full 
					absolute bg-white left-1/2 top-1/2 
					-translate-x-1/2 -translate-y-1/2
				'
                ></div>
                <div
                    className='w-[35px] h-[35px] rounded-full 
					absolute bg-slate-600 left-1/2 top-1/2 
					-translate-x-1/2 -translate-y-1/2
				'
                ></div>
            </div>

            <div className='px-4 lg:px-0 text-center'>
                <h1
                    className='text-2xl lg:text-xl font-bold py-2 my-4 '
                    title={currentSong?.title}
                >
                    {currentSong?.title && subString(currentSong?.title, 30)}
                </h1>
                <small
                    className='tracking-[5px] text-lg'
                    title={currentSong?.artists}
                >
                    {subString(currentSong?.artists, 30)}
                </small>
            </div>

            <div className='flex items-center justify-center'>
                {/* {isOpenDisk && <PlayerVolume />} */}
            </div>
        </React.Fragment>
    );
};

export default Disk;
