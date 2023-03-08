import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import mobileReducer from './reducers/MobileSlice';
import authReducer from './reducers/AuthSlice';
import routeReducer from './reducers/RouteSlice';
import taskLogicReducer from './reducers/TaskLogicSlice';
import filterReducer from './reducers/FilterSlice';

export default configureStore({
    reducer: {
        mobileStates: mobileReducer,
        themeState: themeReducer,
        sidebarStates: sidebarReducer,

        authStates: authReducer,
        routeState: routeReducer,

        taskGroupStates: taskGroupReducer,
        taskLogic: taskLogicReducer,

        filterStates: filterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})