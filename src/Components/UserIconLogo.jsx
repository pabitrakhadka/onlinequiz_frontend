import React from 'react';

const UserIconLogo = ({ name = '' }) => {
    // Get the first letter of the name, capitalize it, or default to 'P'
    const initial = name ? name.charAt(0).toUpperCase() : "";

    return (
        <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center P-3 M-3">
            <h1 className="text-lg font-bold">{initial}</h1>
        </div>
    );
};

export default UserIconLogo;
