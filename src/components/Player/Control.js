import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIsLoop,
    setIsPlaying,
    setMusic,
    setPlayListShuffle,
} from "../../redux/slice/musicSlice";
import { BsFillPlayFill, BsFillPauseFill, BsShuffle } from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious, MdOutlineRepeat } from "react-icons/md";
import { memo } from "react";
const Control = () => {
    const dispatch = useDispatch();

    const {
        albumPlayList,
        indexSong,
        isPlaying,
        isShuffle,
        isLoop,
        playListQueue,
    } = useSelector((state) => state.music);

    // // Previos song
    const handlePrev = () => {
        const condition = indexSong === 0;
        dispatch(
            setMusic({
                albumPlayList,
                playListQueue,
                currentSong: condition
                    ? playListQueue[playListQueue.length - 1]
                    : playListQueue[indexSong - 1],
                indexSong: condition ? playListQueue.length - 1 : indexSong - 1,
            })
        );
    };

    // // Next song
    const handleNext = () => {
        const condition = playListQueue.length - 1 === indexSong;
        dispatch(
            setMusic({
                albumPlayList,
                playListQueue,
                currentSong: condition
                    ? playListQueue[0]
                    : playListQueue[indexSong + 1],
                indexSong: condition ? 0 : indexSong + 1,
            })
        );
    };

    // Loop single song
    const handleLoopSong = () => dispatch(setIsLoop(!isLoop));

    // Toggle shuffle song
    const handleShuffle = () => dispatch(setPlayListShuffle());

    // Toggle isPlay & if it play show pause button and otherwise ...
    const playSong = () => dispatch(setIsPlaying(!isPlaying));

    return (
        <div className='flex justify-between items-center lg:w-3/4 mx-auto lg:my-2'>
            <span
                onClick={handleShuffle}
                className={`w-8 h-8 rounded-full  text-white cursor-pointer 
							${isShuffle ? "bg-green-500" : "bg-transparent"}
                        	hover:bg-green-500 transition-all flex items-center justify-center`}
            >
                <BsShuffle title='Shuffle song' />
            </span>
            <span
                onClick={handlePrev}
                className='w-10 h-10 rounded-full  text-white cursor-pointer 
                        hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
            >
                <MdSkipPrevious fontSize={"1.5em"} title='Previos song' />
            </span>
            <span
                onClick={playSong}
                className='w-10 h-10 text-black rounded-full cursor-pointer 
                        hover:scale-110 transition-all bg-white flex items-center justify-center'
            >
                {isPlaying ? (
                    <BsFillPauseFill fontSize={"1.2em"} title='Stop song' />
                ) : (
                    <BsFillPlayFill fontSize={"1.2em"} title='Play song' />
                )}
            </span>
            <span
                onClick={handleNext}
                className='w-10 h-10 rounded-full  text-white cursor-pointer  hover:bg-green-500 transition-all bg-transparent flex items-center justify-center'
            >
                <MdSkipNext fontSize={"1.5em"} title='Next song' />
            </span>
            <span
                onClick={handleLoopSong}
                className={`w-8 h-8 rounded-full  text-white cursor-pointer ${
                    isLoop ? "bg-green-500" : "bg-transparent"
                }
                        hover:bg-green-500 transition-all flex items-center justify-center `}
            >
                <MdOutlineRepeat title='Loop song' />
            </span>
        </div>
    );
};

export default memo(Control);
