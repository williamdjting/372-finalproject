import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        await axios.get('/users/isLoggedIn').then((res) => {
            setCurrentUser(res.data.profile);
            setIsLoading(false);
        }).catch((err) => {
            setCurrentUser(null);
            setIsLoading(false);
        })
    }

    async function login(email, password) {
        const res = await axios.post('/users/login', {
            email: email,
            password: password
        });

        if (res.data.success)
            await checkAuth();

        return res;
    }

    function logout() {
        // Invalidate JWT token.
        document.cookie = 'token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
    }

    async function register(email, username, password) {
        return await axios.post('/users/register', {
            username: username,
            password: password,
            email: email
        });
    }

    const value = {
        currentUser,
        isLoading,
        login,
        logout,
        register,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
