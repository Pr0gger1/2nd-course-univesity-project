import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from './hooks/useToast';
import { useMediaQuery } from "react-responsive";

import ToastContext from './context/toast.context';
import AppRouter from "./router/AppRouter";
import Toast from "./components/ui/toast/Toast";

import { setUser } from "./store/reducers/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import {getUserTasks} from "./store/reducers/TaskSlice";

function App() {
    const userData = useSelector(state => state.authStates.userData) || localStorage.getItem('userData');
    const isAuth = !!userData;

    const { toastList, setToastList, toastElement } = useToast();
    const [toastPosition, setToastPosition] = useState("top_right");

    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.themeState.theme);


    // функция отслеживания изменения состояния авторизации
    useMemo(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({ data: user }));
            }
        });
    }, [dispatch]);

    // подгрузка существующих задач
    useEffect(() => {
        if (isAuth) {
            dispatch(getUserTasks(userData.uid))
        }
    }, [dispatch, isAuth, userData])

    useMemo(() => {
        // изменение значения атрибута data-theme при изменении темы в приложении
        document.documentElement.setAttribute("data-theme", currentTheme)
        localStorage.setItem('theme', currentTheme);

        // изменение цвета адресной строки для мобильных устройств
        const meta = document.querySelector('meta[name="theme-color"]');

        let themeColor = "#dfdfdf";
        if (currentTheme === "dark") themeColor = "#232323";

        if (meta) meta.setAttribute('content', themeColor);
    }, [currentTheme]);

    return (
        <ToastContext.Provider
            value={{
                toastList,
                setToastList,
                toastElement,
                position: toastPosition,
                setPosition: setToastPosition,
            }}
        >
            <Toast position={toastPosition} />
            <AppRouter isAuth={isAuth} />
        </ToastContext.Provider>
    );
}

export default App;
