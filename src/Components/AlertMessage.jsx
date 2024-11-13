// AlertMessage.js
import React from 'react';
import { useRouter } from 'next/router';

const AlertMessage = ({ message }) => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login'); // Replace '/login' with your actual login/register page route
    };

    return (
        <div className="flex items-center justify-between bg-blue-100 border border-blue-300 text-blue-700 rounded-lg p-4 mt-4 max-w-lg mx-auto shadow-lg space-x-4">
            <div className="flex items-center">
                <svg
                    className="w-6 h-6 mr-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m-1-4h2a2 2 0 00-2-2v0a2 2 0 00-2 2h2zm6-2a9 9 0 11-12 0 9 9 0 0112 0z"
                    />
                </svg>
                <p className="font-medium">{message}</p>
            </div>
            <button
                onClick={handleLoginClick}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Login
            </button>
        </div>
    );
};

export default AlertMessage;
