import React, {useContext} from 'react';
import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import {Navigate, useRoutes} from "react-router-dom";
import UIStates from "../context/UIStates.context";
import ConditionalRoute from "./ConditionalRoute";
import MobileHomePage from "../components/pages/mobile/MobileHomePage";

const AppRouter = ( {isAuth = false} ) => {
    const { isMobile } = useContext(UIStates);
    const UnauthorizedRoutes = [
        { path: "/", element: <Navigate to="/login"/> },
        { path: "/login", element: <AuthPage/> },
        { path: "/register", element: <AuthPage register/> },
        { path: "*", element: <AuthPage/> }
    ];

    const AuthorizedRoutes = [
        {
            path: "/",
            element: <ConditionalRoute
                conditionVar={isMobile}
                onTrueRoute={<MobileHomePage/>}
                onFalseRoute={<HomePage/>}
            />
        },
        {
            path: "/login",
            element: <AuthPage/>
        },
        {
            path: "/register",
            element: <AuthPage register/>
        },
        {
            path: "*",
            element: <ErrorPage/>
        }
    ];

    return useRoutes(isAuth ? AuthorizedRoutes : UnauthorizedRoutes);
}

export default AppRouter;