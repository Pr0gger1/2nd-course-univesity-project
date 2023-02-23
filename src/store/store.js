import { configureStore } from "@reduxjs/toolkit";
import UIReducer from './reducers/UIStates';
export default configureStore({
    reducer: {
        uiStates: UIReducer
    }
})