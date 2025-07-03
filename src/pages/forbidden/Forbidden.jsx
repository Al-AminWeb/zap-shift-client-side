import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-200 to-red-300 px-4">
            <div className="bg-white shadow-xl rounded-lg p-10 max-w-md text-center">
                <div className="text-red-500 text-6xl mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
                <p className="text-gray-600 mb-6">
                    You don’t have permission to access this page.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;