import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AuthContext} from "./context/auth.context";

import {useAuth} from './hooks/useAuth';
import {useToast} from "./hooks/useToast";

import AppRouter from './router/AppRouter';
import Toast from "./components/ui/toast/Toast";

import ToastContext from './context/toast.context';

function App() {
    const {login, logout, token, userData} = useAuth();
    const isAuth = !!token;
    // const isAuth = true;

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
              <BrowserRouter>
                <Toast position={toastPosition}/>
                <AppRouter isAuth={isAuth}/>
              </BrowserRouter>
          </ToastContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
