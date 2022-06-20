import React from "react";
import Slider from "rc-slider";

const ProgessBar = ({
    progessBarValueMax,
    progessBarValue,
    onChageRange,
    songRemaining,
    songDuration,
}) => {
    return (
        <div className={`grid grid-cols-12 py-2`}>
            <span className='col-span-2 text-xs'>{songRemaining}</span>
            {/* <div></div> */}
            <Slider
                max={progessBarValueMax}
                value={progessBarValue}
                onChange={onChageRange}
                className='col-span-8 w-full h-1 '
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
            <span className='col-span-2 text-right text-xs '>
                {songDuration}
            </span>
        </div>
    );
};

export default ProgessBar;
