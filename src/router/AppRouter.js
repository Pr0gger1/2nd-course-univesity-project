import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";
import { Navigate, useRoutes } from 'react-router-dom';

import { mobileSelector } from "../store";

import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import ConditionalRoute from './ConditionalRoute';
import TaskPage from "../components/pages/mobile/TaskPage";
import TaskInfoPage from "../components/pages/mobile/TaskInfoPage";


const AppRouter = ({ isAuth = false }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(mobileSelector) || mobileScreen;

    const UnauthorizedRoutes = [
        { path: "/login", element: <AuthPage/> },
        { path: "/register", element: <AuthPage register/> },
        { path: "*", element: <Navigate to="/login"/> }
    ];

    const AuthorizedRoutes = [
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: '/tasks/:task_group_id',
            element: <ConditionalRoute
                conditionVar={isMobile}
                onTrueRoute={<TaskPage/>}
                onFalseRoute={<HomePage/>}
            />
        },
        {
            path: '/tasks/:task_group_id/:task_id',
            element: <ConditionalRoute
                conditionVar={isMobile}
                onTrueRoute={<TaskInfoPage/>}
                onFalseRoute={<HomePage/>}
            />
        },
        {
            path: "/login",
            element: <Navigate to='/'/>
        },
        {
            path: "/register",
            element: <Navigate to='/'/>
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