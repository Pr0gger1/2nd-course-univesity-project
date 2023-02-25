import React, { useMemo, useState } from 'react';
import { useToast } from './hooks/useToast';

import AppRouter from './router/AppRouter';
import Toast from './components/ui/toast/Toast';

import ToastContext from './context/toast.context';
import {useSelector} from "react-redux";

function App() {
    const isAuth = true;

    const {toastList, setToastList, toastElement} = useToast();
    const [toastPosition, setToastPosition] = useState('top_right');
    const currentTheme = useSelector(state => state.themeState.theme);

    useMemo(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
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
