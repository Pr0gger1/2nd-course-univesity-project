import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AuthContext} from "./context/auth.context";

import {useAuth} from './hooks/useAuth';
import {useToast} from "./hooks/useToast";

import AppRouter from './router/AppRouter';
import Toast from "./components/ui/toast/Toast";
import {ToastContext} from './context/toast.context';


function App() {
    const {login, logout, token, userData} = useAuth();
    const [isAuth, setIsAuth] = useState(!!token);

    const {toastList, setToastList, toastElement} = useToast();

    return (
      <AuthContext.Provider value={{
          login, logout, token: token, userData: userData,
          isAuth: isAuth
      }}>
          <ToastContext.Provider value={{
              toastList: toastList, setToastList: setToastList,
              toastElement: toastElement
          }}>
              <BrowserRouter>
                <Toast position='top_right'/>
                <AppRouter isAuth={isAuth}/>
              </BrowserRouter>
          </ToastContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;
