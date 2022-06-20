import React, { memo, useEffect, useState } from "react";
import { BsHeart } from "react-icons/bs";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { setIsMute, setVolume } from "../../redux/slice/musicSlice";
import Slider from "rc-slider";

const PlayerVolume = () => {
    const { isMute } = useSelector((state) => state.music);
    const [stateVolume, setStateVolume] = useState(1);
    const dispatch = useDispatch();
    const debouncedValue = useDebounce(stateVolume, 300);
    const [volumeValue, setVolumeValue] = useState(100);

    // Debouce volume change
    useEffect(() => {
        dispatch(setVolume(stateVolume));
        // eslint-disable-next-line
    }, [debouncedValue]);

    // Change Volume
    const handleChageVolume = (value) => {
        setVolumeValue(value);
        // // if adready mute, unmute that
        if (isMute) dispatch(setIsMute(false));
        setStateVolume(value / 100);
    };

    // Mute song
    const handleMute = () => {
        let volumeValue;
        !isMute ? (volumeValue = 0) : (volumeValue = 1);
        setVolumeValue(volumeValue * 100);
        dispatch(setIsMute(!isMute));
        dispatch(setVolume(volumeValue));
    };

    return (
        <div className='lg:col-auto lg:row-span-2 hidden lg:grid grid-cols-8 items-center pr-4'>
            <div className='col-start-2 w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-green-500 transition-all rounded-full '>
                <BsHeart />
            </div>
            <div
                className='w-10 h-10 flex justify-center items-center cursor-pointer text-[1.2em]'
                onClick={handleMute}
            >
                {!isMute ? <MdVolumeUp /> : <MdVolumeOff />}
            </div>
            <Slider
                defaultValue={100}
                value={volumeValue}
                onChange={handleChageVolume}
                className='col-span-5 h-1 my-1 w-full'
                trackStyle={{
                    backgroundColor: "#4ade80",
                }}
                handleStyle={{
                    backgroundColor: "#22c55e",
                    opacity: 1,
                }}
                railStyle={{
                    backgroundColor: "#bbf7d0",
                }}
            />
        </div>
    );
};

export default memo(PlayerVolume);
