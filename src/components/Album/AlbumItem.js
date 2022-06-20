import React from "react";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { subString } from "../../helper/helper";
import {
    setAlbum,
    setMusic,
    setPlayListShuffle,
} from "../../redux/slice/musicSlice";

const AlbumItem = ({ album }) => {
    const dispatch = useDispatch();
    const { isShuffle } = useSelector((state) => state.music);

    const handlePlayAlbum = () => {
        dispatch(setAlbum(album));
        dispatch(
            setMusic({
                albumPlayList: album?.playList,
                currentSong: album?.playList[0],
                indexSong: 0,
                playListQueue: album?.playList,
            })
        );
        // the first dispatch to cleart list the secont to set again
        if (isShuffle) {
            dispatch(setPlayListShuffle());
            dispatch(setPlayListShuffle());
        }
    };

    return (
        <li
            className='h-[210px] bg-slate-700 text-white rounded-md p-2 
            hover:bg-slate-600 duration-300 cursor-pointer relative group '
        >
            <div className='h-[130px] overflow-hidden rounded-md w-full shadow-md bg-gradient-to-r from-green-500 to-teal-500'>
                <img
                    crossOrigin='anonymous'
                    src={album?.thumbnail}
                    className='w-full h-full object-cover'
                    alt='thumbnail'
                />
            </div>
            <Link
                to={`/album/${album?.id}`}
                className='font-bolxd mt-2 block text-sm md:text-base whitespace-nowrap overflow-hidden'
                title={album?.album}
            >
                {album?.album && subString(album?.album, 20)}
            </Link>
            <small>{album?.artists.map((a) => a)}</small>
            <span
                onClick={handlePlayAlbum}
                className='absolute w-10 h-10 bg-green-500 flex items-center justify-center
                    rounded-full right-4 duration-300 bottom-16 opacity-0 text-black shadow-md
                    group-hover:opacity-100
                    group-hover:bottom-20'
            >
                <FaPlay />
            </span>
        </li>
    );
};

export default AlbumItem;
