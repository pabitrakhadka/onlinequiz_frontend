import { checkAuthStatus } from "@/functions/user";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Fetching User data

        if (loading) {

            // fetchAuthStatus();


        } else {


        }
    }, []);

    // Function to fetch authentication status
    const fetchAuthStatus = async () => {
        try {
            const res = await checkAuthStatus();

            if (res.status === 200) {
                console.log("res data=", res.data.data);
                setUser(res.data.data);
                setLoading(false);

            } else {
                console.log("Error: Failed to fetch user data");
                setUser(null);
            }
        } catch (error) {
            console.error("Error occurred while fetching auth status:", error);
            setUser(null);
        } finally {
            setLoading(false); // Ensure loading is set to false regardless of success or failure
        }
    };

    const login = (userData) => {
        setUser(userData);
    };

    const isLoggedIn = () => {
        setLoading(false);
    }

    const logout = () => {
        setUser(null);
        router.push("/login"); // Redirect user to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
