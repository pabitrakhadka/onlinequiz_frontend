import React from 'react';

const ToggleButton = ({ isChecked = true, onClick }) => {
    return (
        <div className='flex items-center'>
            <h1 className='text-3xl font-bold text-gray-800'>{isChecked ? "Excel File Upload" :
                "CSV file Upload"}</h1>
            <label className="relative inline-block w-16 h-8">

                <input
                    type="checkbox"
                    checked={isChecked}
                    onClick={onClick}
                    className="opacity-0 w-0 h-0"
                />
                <span
                    className={`slider absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 
        ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`block w-7 h-7 bg-white rounded-full transition-transform duration-300 
          ${isChecked ? 'transform translate-x-8' : ''}`}
                    ></span>
                </span>
            </label>
        </div>
    );
};

export default ToggleButton;
