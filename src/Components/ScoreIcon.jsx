import React from 'react'

const ScoreIcon = ({ score }) => {
    return (
        <div className='flex items-center'>
            <p>Score:{score}</p>
            <img className='w-5 h-5 rounded-full mr-4' src={`http://localhost:3001/upload/images/score.png`} alt="" />
        </div>
    )
}

export default ScoreIcon