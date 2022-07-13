import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

axios.interceptors.request.use(
    config => {
        config.headers['x-auth-token'] = JSON.parse(localStorage.getItem('profile'))?.token;
        return config
    },
    error => {
        Promise.reject(error)
    }
);

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
            setCurrentUser(res.data.auth);
            setIsLoading(false);
        }).catch((err) => {
            setCurrentUser();
            setIsLoading(false);
        })
    }

    async function login(email, password) {
        await axios.post('/users/login', {
            email: email,
            password: password
        }).then(async (res) => {
            if (res.data.auth) {
                localStorage.setItem('profile', JSON.stringify(res.data.profile));
                await checkAuth();
            }
        });
    }

    function logout() {
        localStorage.removeItem('profile');
    }

    async function register(email, username, password) {
        await axios.post('/users/register', {
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
