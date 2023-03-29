import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasks } from "./store/reducers/TaskSlice";
import { setUser } from "./store/reducers/AuthSlice";
import { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";

import AppRouter from "./router/AppRouter";
import SnackbarProvider from "./providers/SnackbarProvider";


function App() {
    const userData = useSelector(state => state.authStates.userData) || localStorage.getItem('userData');
    const isAuth = !!userData;

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
        <SnackbarProvider>
            <AppRouter isAuth={isAuth} />
        </SnackbarProvider>
    );
}

export default App;
