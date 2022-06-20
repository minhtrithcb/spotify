import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Player from "../../components/Player/Player";
import Navbar from "./NavBar";
import SideBar from "./SideBar";

const MusicLayout = () => {
    const { currentSong } = useSelector((state) => state.music);
    const [toggleSideBar, settoggleSideBar] = useState(() => {
        let check = localStorage.getItem("isToggle");
        try {
            if (JSON.parse(check)) {
                return true;
            }
            localStorage.setItem("isToggle", JSON.stringify(false));
            return false;
        } catch (error) {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem("isToggle", JSON.stringify(toggleSideBar));
    }, [toggleSideBar]);

    return (
        <div className='h-screen w-full bg-slate-800'>
            <Navbar toggleSideBar={toggleSideBar} />
            <SideBar
                toggleSideBar={toggleSideBar}
                settoggleSideBar={settoggleSideBar}
            />
            <div
                className={`overflow-y-auto overflow-x-hidden scrollBar pt-20
				${currentSong !== null && "pb-32 sm:pb-40"} pr-1 bg-slate-800 
				${toggleSideBar ? "lg:ml-20" : "lg:ml-80"}  h-[calc(100%_-_5rem)] lg:h-full`}
            >
                <Outlet />
            </div>
            <Player />
        </div>
    );
};

export default MusicLayout;
