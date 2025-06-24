import React from 'react';

import booking from '../../../assets/bookingIcon.png';
import cod from '../../../assets/bookingIcon.png';
import hub from '../../../assets/bookingIcon.png';
import sme from '../../../assets/bookingIcon.png';

const cards = [
    {
        title: 'Booking Pick & Drop',
        description: 'From personal packages to business shipments — we deliver on time, every time.',
        image: booking,
    },
    {
        title: 'Cash On Delivery',
        description: 'From personal packages to business shipments — we deliver on time, every time.',
        image: cod,
    },
    {
        title: 'Delivery Hub',
        description: 'From personal packages to business shipments — we deliver on time, every time.',
        image: hub,
    },
    {
        title: 'Booking SME & Corporate',
        description: 'From personal packages to business shipments — we deliver on time, every time.',
        image: sme,
    },
];

const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-10">
                <h2 className="text-3xl font-bold">How It Works</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="card bg-base-100 shadow-md p-6 flex flex-col "
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-16 h-16 mb-4 object-contain"
                        />
                        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                        <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
