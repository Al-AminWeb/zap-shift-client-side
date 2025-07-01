import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
            {/* Spinner */}
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-blue-500 animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-white shadow-inner shadow-blue-200"></div>
            </div>

            {/* Loading text */}
            <p className="mt-6 text-lg text-blue-800 font-semibold animate-pulse tracking-wide">
                Getting things ready...
            </p>
        </div>
    );
};

export default Loading;
