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

function App() {
    const isAuth = !!useSelector(state => state.authStates.userData) || localStorage.getItem('userData');

    const { toastList, setToastList, toastElement } = useToast();
    const [toastPosition, setToastPosition] = useState("top_right");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTheme = useSelector((state) => state.themeState.theme);


    const mobileScreen = useMediaQuery({ maxWidth: 768 });
    const isMobile = useSelector(
        state => state.mobileStates.isMobile
    ) || mobileScreen;

    const selectedTaskGroup = useSelector(
        state => state.taskGroupStates.selectedTaskGroup
    );
 
    /*
     Перенаправление пользователя в корень
      при первой загрузке мобильной версии приложения
    */
    useEffect(() => {
        if (isMobile && !localStorage.getItem("selectedTaskGroup")) {
            navigate("/");
        }
    }, [selectedTaskGroup, isMobile, navigate]);

    useMemo(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                dispatch(setUser({ data: user }));
            }
        });
    }, [dispatch]);

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
