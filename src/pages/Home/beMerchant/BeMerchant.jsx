import React from 'react';
import merchant from '../../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div>
            <div className="hero h-[438px] rounded-lg my-12 bg-[#03373D]">
                <div className="hero-content flex-col lg:flex-row-reverse p-[80px]">
                    <img
                        src={merchant}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-base-100">Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className="py-6 text-base-100">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <button className="btn bg-[#CAEB66] rounded-4xl">Become a Merchant</button>
                        <button className="btn border-[#CAEB66] rounded-4xl bg-[#03373D] m-5 text-[#CAEB66]">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
