import AuthContext from '@/Context/context'
import React, { useContext } from 'react'

const Check = () => {

    const { user, login, logout, loading, isLoggedIn } = useContext(AuthContext);

    {
        console.log(user)
        console.log("loading", loading);
    }
    return (
        <div>
            {loading ? <>
                <p>Please Login</p>
            </> : <>
                <p>Pleae Logout</p>
            </>}
        </div>
    )
}

export default Check