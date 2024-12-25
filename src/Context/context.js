import { checkAuthStatus } from "@/functions/user";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

// Context Creation
const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // User data state
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    // Fetch auth status only on mount
    useEffect(() => {
        if (loading) {
            fetchAuthStatus();
        }
    }, [loading]); // Dependency on loading to prevent repeated fetch calls

    // Function to fetch authentication status
    const fetchAuthStatus = async () => {
        try {
            const res = await checkAuthStatus();  // API call to check status
            if (res.status === 401) {
                router.push('/login');  // Redirect if user is not authenticated
            } else if (res.status === 200) {
                setUser(res.data?.user);  // Set user data if authenticated
            } else {
                router.push("/login");  // Default to login page on error
            }
        } catch (error) {
            console.error("Error fetching auth status:", error);
            setUser(null);
        } finally {
            setLoading(false);  // Ensure loading state is always updated
        }
    };

    // Login handler
    const login = (userData) => {
        setUser(userData);
        setLoading(false); // Stop loading after user data is set
    };

    // Logout handler
    const logout = () => {
        setUser(null);
        setLoading(true); // Set loading state to true during logout
        router.push("/login");
    };

    return (
        <UserAuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserAuthContext.Provider>
    );
};

export default UserAuthContext;
