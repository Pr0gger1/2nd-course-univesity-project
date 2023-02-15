import React from 'react';
import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import {Navigate, useRoutes} from "react-router-dom";

const AppRouter = ( {isAuth = false} ) => {
    const UnauthorizedRoutes = [
        { path: "/", element: <Navigate to="/login"/> },
        { path: "/login", element: <AuthPage register={false}/> },
        { path: "/register", element: <AuthPage register={true}/> },
        { path: "*", element: <AuthPage register={false}/> }
    ];

    const AuthorizedRoutes = [
        { path: "/", element: <HomePage/> },
        { path: "/login", element: <AuthPage register={false}/> },
        { path: "/register", element: <AuthPage register={true}/> },
        { path: "*", element: <ErrorPage/> }
    ];

    return useRoutes(isAuth ? AuthorizedRoutes : UnauthorizedRoutes);
}

export default AppRouter;