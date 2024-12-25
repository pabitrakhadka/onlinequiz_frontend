import AuthContext from '@/Context/context'
import { fullName } from '@/services/fullName';
import React from 'react'
import { useContext } from 'react'

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
            <div className="m-2">
                <img
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
                    src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Profile"
                />
            </div>
            <div>
                <h5 className="text-lg font-semibold sm:text-xl md:text-2xl">{fullName(user?.firstName, user?.lastName)}</h5>
                <p className="text-sm text-gray-500 sm:text-base md:text-lg"></p>
            </div>
        </div>
    )
}

export default MyProfile