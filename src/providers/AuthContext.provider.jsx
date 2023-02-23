import React from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../context/auth.context";

const AuthContextProvider = ({ children }) => {
    const {login, logout, token, userData} = useAuth();
    const isAuth = true;
    // const isAuth = !!token;

    return (
        <AuthContext.Provider value={{
            login, logout, token,
            userData, isAuth
            }}>
                { children }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;