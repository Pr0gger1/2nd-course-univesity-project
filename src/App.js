import React, {useEffect, useMemo, useState} from 'react';
import ToastContext from './context/toast.context';

import { useToast } from './hooks/useToast';
import { useDispatch, useSelector } from 'react-redux';

import AppRouter from './router/AppRouter';
import Toast from './components/ui/toast/Toast';

import { setUser } from "./store/reducers/AuthSlice";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';


function App() {
    const isAuth = true;//useSelector(state => state.authStates.isAuth);

    const {toastList, setToastList, toastElement} = useToast();
    const [toastPosition, setToastPosition] = useState('top_right');

    const dispatch = useDispatch();

    const currentTheme = useSelector(state => state.themeState.theme);


    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setUser(user))
                console.log(user)
            }
        })
    }, [dispatch, isAuth]);

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
        const meta = document.querySelector('meta[name="theme-color"]');

        let themeColor = "#dfdfdf";
        if (currentTheme === 'dark') themeColor = '#232323';

        if (meta) meta.setAttribute('content', themeColor);
    }, [currentTheme]);

    useMemo(() => {
        document.documentElement.setAttribute("data-theme", currentTheme)
    }, [currentTheme]);

    return (
        <ToastContext.Provider value={{
            toastList, setToastList,
            toastElement,
            position: toastPosition,
            setPosition: setToastPosition
        }}>

            <Toast position={toastPosition}/>
            <AppRouter isAuth={isAuth}/>

        </ToastContext.Provider>
  );
}

export default App;
