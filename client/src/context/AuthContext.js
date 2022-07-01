import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        await fetch('/users/isLoggedIn', {
            method: 'GET',
            headers: new Headers({
                "x-auth-token": JSON.parse(localStorage.getItem('profile'))?.token,
            }),
        }).then((res) => res.json()).then((data) => {
            setCurrentUser(data.auth);
            setIsLoading(false);
        }).catch((err) => {
            setCurrentUser();
            setIsLoading(false);
        })
    }

    async function login(email, password) {
        await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password
            }),
        }).then((res) => res.json()).then(async (data) => {
            if (data.auth) {
                localStorage.setItem('profile', JSON.stringify(data.profile));
                await checkAuth();
            }
        });
    }

    const value = {
        currentUser,
        isLoading,
        login,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
