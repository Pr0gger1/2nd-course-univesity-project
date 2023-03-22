import React, { useEffect, useMemo, useState } from "react";
import ToastContext from "./context/toast.context";

import { useToast } from "./hooks/useToast";
import { useDispatch, useSelector } from "react-redux";

import AppRouter from "./router/AppRouter";
import Toast from "./components/ui/toast/Toast";

import { setUser } from "./store/reducers/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { useNavigate } from "react-router-dom";

function App() {
  //   let isAuth = useSelector((state) => state.authStates.isAuth) ;
  const isAuth = useSelector(() => localStorage.getItem("isAuth"));
  //   useEffect(() => {
  //     // console.log(localStorage.getItem("isAuth"));
  //     console.log(isAuth);
  //   }, [isAuth]);

  const { toastList, setToastList, toastElement } = useToast();
  const [toastPosition, setToastPosition] = useState("top_right");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTheme = useSelector((state) => state.themeState.theme);

  const isMobile = useSelector((state) => state.mobileStates.isMobile);

  const selectedTaskGroup = useSelector(
    (state) => state.taskGroupStates.selectedTaskGroup
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
        //console.log('AUTH');
        //isAuth = true
        //
        // navigate('/');
        dispatch(setUser(user));

        //console.log(user)
      }
    });
  }, [dispatch, isAuth]);

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

    // изменение значения атрибута data-theme при изменении темы в приложении
    useMemo(() => {
        document.documentElement.setAttribute("data-theme", currentTheme)
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
