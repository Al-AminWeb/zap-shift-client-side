import React from 'react';

import tracking from '../../../assets/live-tracking.png';
import safeDelivery from '../../../assets/safe-delivery.png';
import support from '../../../assets/safe-delivery.png';

const benefits = [
    {
        title: 'Live Parcel Tracking',
        description:
            'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment\'s journey and get instant status updates for complete peace of mind.',
        image: tracking,
    },
    {
        title: '100% Safe Delivery',
        description:
            'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
        image: safeDelivery,
    },
    {
        title: '24/7 Call Center Support',
        description:
            'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
        image: support,
    },
];

const Benefits = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Why Choose Us</h2>
            </div>

            <div className="space-y-6">
                {benefits.map((item, index) => (
                    <div
                        key={index}
                        className="card card-side flex-col md:flex-row items-center bg-base-100 shadow-md p-4 md:p-6 gap-4"
                    >
                        {/* Left image */}
                        <figure className="w-24 md:w-32">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />
                        </figure>

                        {/* Divider (vertical) for md+ */}
                        <div className="hidden md:block h-24 border-l border-base-300"></div>

                        {/* Text content */}
                        <div className="text-center md:text-left md:flex-1">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Benefits;
