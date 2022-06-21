import React from "react";
import Album from "../Db/Album.json";
import TitleBar from "../components/common/TitleBar";
import AlbumItem from "../components/Album/AlbumItem";
import Carosel from "../components/Carosel/Carosel";

const Home = () => {
    return (
        <div className='h-auto w-full pb-4'>
            <Carosel />
            <TitleBar title='Discover' />
            <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4'>
                {Album.map((album) => (
                    <AlbumItem album={album} key={album.id} />
                ))}
            </ul>
        </div>
    );
};

export default Home;
