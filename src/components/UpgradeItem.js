import React from "react";
import { BsCheck2 } from "react-icons/bs";
const UpgradeItem = ({
    data: { name, price, account, bange, benefit, term, id },
}) => {
    return (
        <div className='w-full bg-white h-auto xl:h-[600px] text-black rounded-md relative'>
            <div className='md:h-[320px] xl:h-[450px] p-4 '>
                <span
                    className={`px-2 py-1 rounded text-white mb-4 inline-block text-sm
                ${id === 1 ? "bg-yellow-500" : "bg-blue-500"}`}
                >
                    {bange}
                </span>
                <h3 className='text-xl font-bold mb-2'>{name}</h3>
                <p>{price}</p>
                <p>{account} account</p>
                <hr className='my-4' />
                <ul>
                    {benefit.map((benefit, idx) => (
                        <li key={idx} className='flex items-start mb-1 text-sm'>
                            <BsCheck2 className='flex-shrink-0 mt-1' />
                            <div className='ml-4'>{benefit}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='xl:h-[150px] p-4'>
                <button className='w-full rounded-full mb-4 py-2 bg-black text-white hover:bg-green-500 duration-700'>
                    GET STARTED
                </button>
                <small className='text-xs  inline-block'>{term}</small>
            </div>
        </div>
    );
};

export default UpgradeItem;
