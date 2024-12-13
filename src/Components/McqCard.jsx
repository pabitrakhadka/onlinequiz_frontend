import React from 'react'

const McqCard = ({ onClick, buttonClick, number, showName, children }) => {
    return (
        <div onClick={onClick}

            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
        >
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Set {number}</h2>
                <p className="text-gray-600 mb-6">Multiple Choice Questions</p>

            </div>
            {children}
        </div>
    )
}

export default McqCard