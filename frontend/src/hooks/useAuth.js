import {useState} from "react";

export const useAuth = () => {
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(null);

    const login = () => {}
    const logout = () => {}

    return {login, logout, userData, token}
}