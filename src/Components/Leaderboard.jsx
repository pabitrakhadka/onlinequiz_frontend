import React from 'react'
import UserIconLogo from './userIconLogo'

const Leaderboard = ({ userName = null, userIcon = null, rank }) => {

    const rankStyles = {
        1: "bg-yellow-400 text-black",
        2: "bg-gray-300 text-black",
        3: "bg-amber-600 text-white",
    };

    const rankLabels = {
        1: "1st",
        2: "2nd",
        3: "3rd",
    };

    return (
        <div
            className={`w-36 h-36 flex flex-col items-center justify-center rounded-full shadow-lg ${rankStyles[rank] || "bg-gray-200 text-black"}`}
        >
            <h1 className="text-3xl font-bold">{rankLabels[rank]}</h1>
            <p className="text-lg font-medium mt-2">{userName}</p>
        </div>

    )
}

export default Leaderboard