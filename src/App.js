import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AuthContext} from "./context/auth.context";

import {useAuth} from './hooks/useAuth';
import {useToast} from "./hooks/useToast";

import AppRouter from './router/AppRouter';
import Toast from "./components/ui/toast/Toast";
import {ToastContext} from './context/toast.context';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByyesgyia35Gm_BXXiwwSURszBgSsw_wE",
  authDomain: "productify-test.firebaseapp.com",
  databaseURL: "https://productify-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "productify-test",
  storageBucket: "productify-test.appspot.com",
  messagingSenderId: "531058036878",
  appId: "1:531058036878:web:c45843086958c18da939df",
  measurementId: "G-MRNR8GK61S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
