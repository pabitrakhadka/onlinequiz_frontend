import React from 'react'
import ButtonComp from '../ButtonComp'
import ScoreIcon from '../ScoreIcon'
import { FaStar } from "react-icons/fa";
import MyProfile from '../MyProfile';
const ProfileCard = () => {
    return (
        <div className='bg-white shadow-md rounded-lg p-5 absolute top-15 right-5 ' style={{ width: "11rem" }}>
            <div className='flex items-center'>
                <div className=' '>

                    <div>


                        <MyProfile />
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