import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

import AuthPage from '../components/pages/AuthPage';
import ErrorPage from '../components/pages/ErrorPage';
import HomePage from '../components/pages/HomePage';

import ConditionalRoute from './ConditionalRoute';
import TaskPage from "../components/pages/mobile/TaskPage";
import TaskInfoPage from "../components/pages/mobile/TaskInfoPage";
import {useMediaQuery} from "react-responsive";


const AppRouter = ({ isAuth = false }) => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(state => state.mobileStates.isMobile) || mobileScreen;

    const UnauthorizedRoutes = [
        { path: "/", element: <Navigate to="/login"/> },
        { path: "/login", element: <AuthPage/> },
        { path: "/register", element: <AuthPage register/> },
        { path: "*", element: <AuthPage/> }
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