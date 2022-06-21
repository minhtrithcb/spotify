import React from "react";
import UpgradeItem from "../components/UpgradeItem";
import Plan from "../Db/Plan.json";
const Upgrade = () => {
    return (
        <div className='text-white p-4'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Pick your Premium</h1>
                <p className='my-4'>
                    Listen without limits on your phone, speaker, and other
                    devices.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
                {Plan.map((plan) => (
                    <UpgradeItem key={plan.id} data={plan} />
                ))}
            </div>
        </div>
    );
};

export default Upgrade;
