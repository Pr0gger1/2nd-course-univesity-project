import { configureStore } from "@reduxjs/toolkit";
import UIReducer from './reducers/SidebarSlice';
import themeReducer from './reducers/ThemeSlice';
import taskGroupReducer from './reducers/TaskGroupSlice';
import mobileReducer from './reducers/MobileSlice';

export default configureStore({
    reducer: {
        mobileStates: mobileReducer,
        sidebarStates: UIReducer,
        taskGroupStates: taskGroupReducer,
        themeState: themeReducer
    }
})