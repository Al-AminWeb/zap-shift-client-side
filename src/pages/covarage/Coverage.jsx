import React from 'react';
import CoverageMap from "./CoverageMap.jsx";

const Coverage = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#03373d]">
                We are available in 64 districts
            </h2>

            {/* Search box comes here later */}

            <CoverageMap />
        </div>
    );
};

export default Coverage;
