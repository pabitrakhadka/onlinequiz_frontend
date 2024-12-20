import React from 'react'
import ButtonComp from '../ButtonComp'
import ScoreIcon from '../ScoreIcon'

const ProfileCard = () => {
    return (
        <div className='bg-white shadow-md rounded-lg p-5 absolute top-15 right-5 ' style={{ width: "11rem" }}>
            <div className='flex items-center'>
                <div className=' '>
                    <img className='w-24 h-24 rounded-full mr-4' src={`http://localhost:3001/upload/images/coin.png`} alt="" />
                    <div>

                        <h2 className='text-2xl font-bold'>Elon Musk</h2>

                        <div className='flex items-center'>

                            <ScoreIcon score={512.12} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <ButtonComp className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' name={"LogOut"} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileCard