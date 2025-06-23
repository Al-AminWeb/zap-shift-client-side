import React from 'react';

const ServiceCard = ({ service }) => {
    const {icon: Icon, title, description}= service;
    return (
        <div className="card bg-base-100 shadow-md  hover:bg-[#CAEB66] hover:shadow-xl transition ">
            <div className="card-body items-center text-center p-6">
                <Icon className="text-4xl text-primary mb-4" />
                <h2 className="card-title text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
