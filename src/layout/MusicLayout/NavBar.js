import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Dropdown, { DropdownItem } from "../../components/common/Dropdown";

const NavBar = ({ toggleSideBar }) => {
    const navi = useNavigate();

    return (
        <div
            className={`bg-gray-800 text-white flex justify-between py-4 px-4 w-full
			${toggleSideBar ? "lg:w-[calc(100%_-_80px)]" : "lg:w-[calc(100%_-_320px)]"}
			fixed top-0 right-0 z-50 h-20 items-center`}
        >
            <div className='flex '>
                <span
                    onClick={() => navi(-1)}
                    className='w-7 h-7 cursor-pointer duration-300 flex justify-center items-center bg-gray-600 hover:bg-gray-800 rounded-full mr-4'
                >
                    <IoIosArrowBack />
                </span>
                <span
                    onClick={() => navi(+1)}
                    className='w-7 h-7 cursor-pointer duration-300 flex justify-center items-center bg-gray-600 hover:bg-gray-800 rounded-full'
                >
                    <IoIosArrowForward />
                </span>
            </div>

            <div className='flex justify-between items-center'>
                <Link to='/upgrade'>
                    <button className='text-sm px-2 sm:px-6 mr-4 h-8 sm:h-10 rounded-3xl border border-white'>
                        Upgrade
                    </button>
                </Link>
                <Dropdown
                    title={
                        <div className='w-auto h-10 rounded-3xl p-2 flex items-center justify-end duration-300 hover:bg-slate-600'>
                            <div className='w-[25px] h-[25px] bg-gradient-to-r from-green-500 to-teal-500 rounded-full inline-block'></div>
                            <span className='ml-2 '>tri vo</span>
                        </div>
                    }
                >
                    <DropdownItem>
                        <Link
                            to={"/account"}
                            className='w-full h-full inline-block'
                        >
                            Account
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link
                            to={"/upgrade"}
                            className='w-full h-full inline-block'
                        >
                            Upgrade to Premium
                        </Link>
                    </DropdownItem>
                    <DropdownItem>Private session</DropdownItem>
                    <DropdownItem>Setting</DropdownItem>
                    <DropdownItem>Log out</DropdownItem>
                </Dropdown>
            </div>
        </div>
    );
};

export default NavBar;
