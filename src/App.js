import React, { useState } from 'react';
import { useToast } from './hooks/useToast';

import AppRouter from './router/AppRouter';
import Toast from './components/ui/toast/Toast';

import ToastContext from './context/toast.context';

function App() {
    const isAuth = true;

    const {toastList, setToastList, toastElement} = useToast();
    const [toastPosition, setToastPosition] = useState('top_right');

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
