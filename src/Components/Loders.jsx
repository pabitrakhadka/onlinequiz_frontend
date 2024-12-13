import React from 'react';
import 'ldrs/tailspin';

const Loders = ({ width = 'w-full', height = 'h-screen', className = null }) => {
    return (
        <div className={`${className} flex items-center justify-center ${width} ${height}`}>
            <div><l-tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="red"
            ></l-tailspin></div>
        </div>
    );
};

export default Loders;
