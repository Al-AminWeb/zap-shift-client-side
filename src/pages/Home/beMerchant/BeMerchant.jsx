import React from 'react';
import merchant from '../../../assets/location-merchant.png';

const BeMerchant = () => {
    return (
        <div className="my-12">
            <div
                data-aos="flip-left"
                className="bg-[url('/assets/be-a-merchant-bg.png')] bg-no-repeat bg-cover bg-center h-auto lg:h-[438px] rounded-lg bg-[#03373D]"
            >
                <div className="hero-content flex-col lg:flex-row-reverse items-center gap-8 px-4 py-10 md:px-8 lg:px-[80px]">
                    {/* Image */}
                    <img
                        src={merchant}
                        alt="Merchant"
                        className="w-full max-w-[220px] sm:max-w-sm md:max-w-md lg:max-w-sm rounded-lg shadow-2xl"
                    />

                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-100">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h1>
                        <p className="py-4 text-base text-base-100">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
                            <button className="btn bg-[#CAEB66] text-black rounded-full w-full sm:w-auto mb-2 sm:mb-0">
                                Become a Merchant
                            </button>
                            <button className="btn border-[#CAEB66] rounded-full bg-[#03373D] text-[#CAEB66] w-full sm:w-auto">
                                Earn with Profast Courier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
