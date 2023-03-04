import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import mobileReducer from './reducers/MobileSlice';
import authReducer from './reducers/AuthSlice';
import routeReducer from './reducers/RouteSlice';

export default configureStore({
    reducer: {
        mobileStates: mobileReducer,
        sidebarStates: sidebarReducer,
        taskGroupStates: taskGroupReducer,
        themeState: themeReducer,
        authStates: authReducer,
        routeState: routeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})