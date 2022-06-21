import { BsHeart, BsPlusSquare, BsSearch } from "react-icons/bs";
import { IoBookmarksOutline, IoHomeOutline } from "react-icons/io5";
import Account from "../page/Account";
import Album from "../page/Album";
import Home from "../page/Home";
import Library from "../page/Library";
import Search from "../page/Search";
import Upgrade from "../page/Upgrade";

export const ROUTE_MUSIC_LAYOUT = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/search",
        component: Search,
    },
    {
        path: "/your-library",
        component: Library,
    },
    {
        path: "/album/:id",
        component: Album,
    },
    {
        path: "/upgrade",
        component: Upgrade,
    },
    {
        path: "/account",
        component: Account,
    },
];

export const NAVIGATE_LINK = [
    {
        id: 1,
        path: "/",
        text: "Home",
        Icon: IoHomeOutline,
    },
    {
        id: 2,
        path: "/search",
        text: "Search",
        Icon: BsSearch,
    },
    {
        id: 3,
        path: "/your-library",
        text: "Your Library",
        Icon: IoBookmarksOutline,
    },
    {
        id: 4,
        path: "/create-playlist",
        text: "Create Playlist",
        Icon: BsPlusSquare,
    },
    {
        id: 5,
        path: "/liked-song",
        text: "Liked song",
        Icon: BsHeart,
    },
];
