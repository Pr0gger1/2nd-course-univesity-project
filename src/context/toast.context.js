import {createContext} from "react";

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => {},
    toastElement: null
});