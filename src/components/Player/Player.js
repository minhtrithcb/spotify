import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setMusic } from "../../redux/slice/musicSlice";
import SubPlayer from "../SubPlayer/SubPlayer";
import PlayerInfo from "./PlayerInfo";
import PlayerVolume from "./PlayerVolume";
import Control from "./Control";
import ProgessBar from "./ProgessBar";

const Player = () => {
    const [progessBarValue, setProgessBarValue] = useState(0);
    const [progessBarValueMax, setProgessBarValueMax] = useState(0);
    const [songRemaining, setSongRemaining] = useState("00:00");
    const [songDuration, setSongDuration] = useState("00:00");
    const dispatch = useDispatch();
    const audioRef = useRef(null);

    const {
        albumPlayList,
        indexSong,
        isMute,
        volume,
        isPlaying,
        playListShuffle,
        playListQueue,
        isLoop,
    } = useSelector((state) => state.music);

    // Force play
    const forcePlay = useCallback(() => {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then((_) => {
                    dispatch(setIsPlaying(true));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [dispatch]);

    // Set up set src and play it play the first song in queue
    useEffect(() => {
        const setupfirstSong = () => {
            if (playListQueue.length !== 0 && audioRef.current !== null) {
                audioRef.current.src = playListQueue[indexSong].src;
                forcePlay();
            }
        };
        setupfirstSong();
    }, [indexSong, playListQueue, forcePlay, playListShuffle]);

    // On subscribe Is playing change
    useEffect(() => {
        const subscribeIsPlaying = () => {
            if (audioRef.current) {
                isPlaying ? audioRef.current.play() : audioRef.current.pause();
            }
        };
        subscribeIsPlaying();
    }, [isPlaying]);

    // On subscribe Volume change
    useEffect(() => {
        const subscribeVolume = () => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
            }
        };
        subscribeVolume();
    }, [isMute, volume]);

    // On subscribe Loop change
    useEffect(() => {
        const subscribeLoop = () => {
            if (audioRef.current) {
                audioRef.current.loop = isLoop;
            }
        };
        subscribeLoop();
    }, [isLoop]);

    // Calc time by curren or duration
    const calTime = (time, cb) => {
        // readyState === 4 => song is ready
        if (audioRef.current && audioRef?.current.readyState === 4) {
            const totalSecond = audioRef?.current[time]; // 80s
            const minute = Math.floor(totalSecond / 60); // ex: 1.3 +> 1
            const second = Math.floor(totalSecond - minute * 60); // ex: 80 - (1 * 60)  => 20s => 1m: 20s
            cb(minute, second);
        }
    };

    // Calc by currentTime (display left side)
    const calcRemain = () => {
        calTime("currentTime", (minute, second) => {
            setSongRemaining(
                `${minute < 10 ? `0${minute}` : minute} : ${
                    second < 10 ? `0${second}` : second
                }`
            );
        });
    };

    // Calc by duration (display right side)
    const calcDuration = () => {
        calTime("duration", (minute, second) => {
            setSongDuration(
                `${minute < 10 ? `0${minute}` : minute} : ${
                    second < 10 ? `0${second}` : second
                }`
            );
        });
    };

    // On audio run
    const handleTimeUpdate = () => {
        calcRemain();
        setProgessBarValue(audioRef.current.currentTime);
    };

    // On audio ready calc max range by time duration
    const handleCanplaythrough = () => {
        calcDuration();
        setProgessBarValueMax(audioRef.current.duration);
    };

    // On audio ended
    const handleEnded = () => {
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

    // On change Music Range
    const handleChageRange = (value) => {
        audioRef.current.currentTime = value;
    };

    return (
        <div>
            {/* // Sub Player  */}
            <SubPlayer />
            <div
                className={`${albumPlayList.length !== 0 ? "grid" : "hidden"}
				fixed text-white bg-gray-800  border-gray-700 border-t w-full h-40 lg:h-32
				bottom-12 sm:bottom-20 lg:bottom-0 left-0 z-50 grid-cols-3 px-4 gap-4 py-4 grid-rows-2 `}
            >
                <audio
                    preload='none'
                    crossOrigin='Anonymous'
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onCanPlayThrough={handleCanplaythrough}
                    onEnded={handleEnded}
                ></audio>
                {/* // Title, artist, btn click open sub plaper  */}
                <PlayerInfo />
                <div className='row-span-1 col-span-3 lg:col-auto'>
                    {/* // Control  */}
                    <Control />
                    {/* // Music range  */}
                    <ProgessBar
                        progessBarValue={progessBarValue}
                        progessBarValueMax={progessBarValueMax}
                        onChageRange={handleChageRange}
                        songRemaining={songRemaining}
                        songDuration={songDuration}
                    />
                </div>
                {/* // Volume  */}
                <PlayerVolume />
            </div>
        </div>
    );
};

export default Player;
