import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsDownload, BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import Dropdown, { DropdownItem } from "../common/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
    setIsPlaying,
    setMusic,
    setPlayListShuffle,
} from "../../redux/slice/musicSlice";
import AlbumSearch from "./AlbumSearch";

const AlbumPlayer = () => {
    const dispatch = useDispatch();
    const {
        albumInfo,
        isPlaying,
        indexSong,
        currentSong,
        albumPlayList,
        isShuffle,
    } = useSelector((state) => state.music);

    // Toggle isPlay & if it play show pause button and otherwise ...
    const playSong = () => {
        // Playing this album only the first time
        if (albumPlayList.length === 0 && indexSong === 0)
            return setupPlayAlbum();

        // If user on same album is play pause when click
        if (currentSong?.albumId + "" === albumInfo.id) {
            dispatch(setIsPlaying(!isPlaying));
        } else {
            // Otherwise user on the other album setup again
            setupPlayAlbum();
        }
    };

    // Set up to run this album and the first song
    const setupPlayAlbum = () => {
        // dispatch(setIsPlaying(!isPlaying));
        dispatch(
            setMusic({
                albumPlayList: albumInfo?.playList,
                playListQueue: albumInfo?.playList,
                currentSong: albumInfo?.playList[0],
                indexSong: 0,
            })
        );

        if (isShuffle) {
            dispatch(setPlayListShuffle());
        }
    };

    // Check if song on play equal album id
    // Because albumInfo?.id = string so currentSong?.albumId + '' => return string
    const checkIsPlayingOnAlbum = () => {
        return isPlaying && currentSong?.albumId + "" === albumInfo?.id;
    };

    return (
        <div className='sticky mt-2 top-0 h-14 bg-slate-800 backdrop-blur-sm bg-slate-800/30  flex items-center justify-between z-30'>
            <div className='flex'>
                <span
                    className='w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 text-black shadow-md cursor-pointer'
                    onClick={playSong}
                >
                    {checkIsPlayingOnAlbum() ? (
                        <BsFillPauseFill fontSize={"1.2em"} />
                    ) : (
                        <BsFillPlayFill fontSize={"1.2em"} />
                    )}
                </span>
                <span
                    className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
                    rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
                >
                    <FaRegHeart />
                </span>

                <Dropdown
                    positionX={true}
                    title={
                        <span
                            className='w-10 h-10 ml-2 md:ml-4 flex items-center justify-center hover:bg-green-500 hover:text-black
						   rounded-full right-4 duration-300 text-gray-200  cursor-pointer'
                        >
                            <BsDownload />
                        </span>
                    }
                >
                    <DropdownItem>Title</DropdownItem>
                    <DropdownItem>Artist</DropdownItem>
                    <DropdownItem>Album</DropdownItem>
                    <DropdownItem>Date added</DropdownItem>
                    <DropdownItem>Duration</DropdownItem>
                </Dropdown>
            </div>

            {/* // Search box  */}
            <AlbumSearch />
        </div>
    );
};

export default AlbumPlayer;
