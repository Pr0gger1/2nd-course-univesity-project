import React, {useState} from 'react';

import {useAuth} from './hooks/useAuth';
import {useToast} from "./hooks/useToast";

import AppRouter from './router/AppRouter';
import Toast from "./components/ui/toast/Toast";

import {AuthContext} from "./context/auth.context";
import ToastContext from './context/toast.context';

function App() {
    const {login, logout, token, userData} = useAuth();
    const isAuth = true;

    const {toastList, setToastList, toastElement} = useToast();
    const [toastPosition, setToastPosition] = useState('top_right');

    return (
        <AuthContext.Provider value={{
        login, logout, token,
        userData, isAuth
        }}>
            <ToastContext.Provider value={{
                toastList, setToastList,
                toastElement,
                position: toastPosition,
                setPosition: setToastPosition
            }}>

                <Toast position={toastPosition}/>
                <AppRouter isAuth={isAuth}/>

            </ToastContext.Provider>
        </AuthContext.Provider>
  );
}

export default App;
