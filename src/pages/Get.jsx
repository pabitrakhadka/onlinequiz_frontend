
import ButtonComp from "@/Components/ButtonComp";
import { getLocalStorage } from "@/services/localStorage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const Get = () => {
    const [isLoad, setIsLoad] = useState(false);
    const [user, setUser] = useState(null);
    const loaddata = () => {
        const isData = getLocalStorage('userData');
        if (isData) {
            setUser(getLocalStorage('userData'));
            setIsLoad(true);
        } else {
            setIsLoad(false);
        }

    }
    useEffect(() => {
        loaddata();
        if (!isLoad) {
            loaddata();
            console.log('data', user);
        }

    }, [])


    return (
        <div>
            {isLoad ? <>
                <div>
                    <div>
                        <p>Id:{user.id}</p>
                        <p>Name:{user.Name}</p>
                        <p>Email:{user.email}</p>
                        <p>AccessToken:{user.accessToken}</p>
                        <p>RefreshToken:{user.refreshToken}</p>

                    </div>
                    <ButtonComp name={"Logout"} />
                </div>
            </> : <>
                <div><ButtonComp name={"Login In"} /></div>
            </>}
        </div>
    );
};

export default Get;
