import React from 'react';
import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import {Navigate, useRoutes} from "react-router-dom";
import ConditionalRoute from "./ConditionalRoute";
import MobileHomePage from "../components/pages/mobile/MobileHomePage";
import {useSelector} from "react-redux";

import MobileContent from "../components/content/MobileContent";

const AppRouter = ( {isAuth = false} ) => {
    const isMobile = useSelector(state => state.mobileStates.isMobile);

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
          path: '/tasks/:task_group_id',
            element: <ConditionalRoute
                conditionVar={isMobile}
                onTrueRoute={<MobileContent/>}
                onFalseRoute={<HomePage/>}
            />
        },
        {
            path: '/tasks/:task_group_id/:task_id',
            element: <HomePage/>
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
            path: "/error",
            element: <ErrorPage/>
        },
        {
            path: "*",
            element: <Navigate to="/error"/>
        }
    ];

    return useRoutes(isAuth ? AuthorizedRoutes : UnauthorizedRoutes);
}

export default AppRouter;