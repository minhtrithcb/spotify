import React from "react";
import second from "../assets/user.svg";
import Profile from "../components/Account/Profile";
import Dropdown, { DropdownItem } from "../components/common/Dropdown";
const Account = () => {
    const option = [
        "Account overview",
        "Edit profile",
        "Change password",
        "Notification settings",
        "Privacy settings",
        "Recover playlists",
        "Receipts",
        "Apps",
        "Redeem",
    ];

    return (
        <div className='p-4 text-white grid grid-cols-10'>
            <div className='col-span-10 lg:col-span-2 flex flex-col items-start pr-4'>
                <div className='flex justify-center w-full'>
                    <div className='w-14 h-14 my-4 bg-gray-700 flex justify-center items-center rounded-full'>
                        <img src={second} alt='user' />
                    </div>
                </div>

                <ul className='w-full hidden lg:block'>
                    {option.map((opt, idx) => (
                        <li
                            className='rounded-md px-4 py-2 hover:bg-green-500 duration-700 mb-2 cursor-pointer'
                            key={idx}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>

                <div className='lg:hidden w-full'>
                    <Dropdown
                        title={
                            <div className='px-4 py-2 bg-slate-500 mb-4 rounded'>
                                Option
                            </div>
                        }
                        positionX={true}
                    >
                        {option.map((opt, idx) => (
                            <DropdownItem key={idx}> {opt}</DropdownItem>
                        ))}
                    </Dropdown>
                </div>
            </div>

            <Profile />
        </div>
    );
};

export default Account;
