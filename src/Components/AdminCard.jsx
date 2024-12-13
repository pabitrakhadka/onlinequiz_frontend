import React from 'react'

const AdminCard = ({ title, value }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h2 className="text-lg font-semibold text-gray-700 text-center">{title}</h2>
            <h1 className="text-5xl font-bold text-blue-600 mt-2 text-center">{value}</h1>
        </div>
    )
}

export default AdminCard