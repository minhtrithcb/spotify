import React from "react";

const Profile = () => {
    return (
        <div className='col-span-10 lg:col-span-8 bg-white text-black p-4 rounded-lg'>
            <h1 className='text-3xl font-bold'>Account overview</h1>
            <p className='py-4 text-lg font-bold'>Profile</p>

            <table className='table-fixed w-full'>
                <tbody>
                    <tr className='border-b'>
                        <td className='py-4 text-gray-500 font-medium '>
                            Username
                        </td>
                        <td>8xasas41a7vv4vfbg7gb1fdvd1v</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-4 text-gray-500 font-medium '>
                            Email
                        </td>
                        <td>vominhtri.dev@gmail.com</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-4 text-gray-500 font-medium '>
                            Date of birth
                        </td>
                        <td>January 10, 1998</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-4 text-gray-500 font-medium '>
                            Country or region
                        </td>
                        <td>Vietnam</td>
                    </tr>
                </tbody>
            </table>

            <button className=' rounded-full my-4 py-2 px-4 bg-black text-white hover:bg-green-500 duration-700'>
                EDIT PROFILE
            </button>
        </div>
    );
};

export default Profile;
