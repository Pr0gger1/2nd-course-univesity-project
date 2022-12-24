import React from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

import {useRoutes} from "react-router-dom";

const AppRouter = ( {isAuth} ) => {
    const UnauthorizedRoutes = [
        { path: "/login", element: <LoginPage/> },
        { path: "/register", element: <RegisterPage/> },
        { path: "*", element: <LoginPage/> }
    ];

    const AuthorizedRoutes = [
        { path: "/login", element: <LoginPage/> },
        { path: "/register", element: <RegisterPage/> },
        { path: "*", element: <ErrorPage/> },
        { path: "/", element: <HomePage/> }
    ];

    const currentRoutes = isAuth ? AuthorizedRoutes : UnauthorizedRoutes;

    return useRoutes(currentRoutes);
}

export default AppRouter;