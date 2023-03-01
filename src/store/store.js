import { configureStore } from "@reduxjs/toolkit";

import UIReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import mobileReducer from './reducers/MobileSlice';
import authReducer from './reducers/AuthSlice';

export default configureStore({
    reducer: {
        mobileStates: mobileReducer,
        sidebarStates: UIReducer,
        taskGroupStates: taskGroupReducer,
        themeState: themeReducer,
        authStates: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})