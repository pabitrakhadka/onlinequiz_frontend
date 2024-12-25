import ButtonComp from "@/Components/ButtonComp";
import UserAuthContext from "@/Context/context";
import React, { useContext } from "react";
import { useEffect } from "react";

const Get = () => {
    const { user, loading, logout } = useContext(UserAuthContext)
    if (loading) {
        return <p>Loading...</p>;  // Show loading state while the authentication status is being checked
    }

    if (!user) {
        return <p>Please log in to access this page.</p>;  // Show this message if no user is authenticated
    }


    return (
        <div>
            {user ? (
                <div>
                    <div>
                        <p>Id: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>

                    </div>
                    <ButtonComp name={"Logout"} onClick={logout} />
                </div>
            ) : (
                <div>
                    <ButtonComp name={"Login"} onClick={() => router.push("/login")} />
                </div>
            )}
        </div>
    );
};

export default Get;
