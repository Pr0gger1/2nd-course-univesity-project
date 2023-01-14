import {createContext} from "react";

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => {},
    toastElement: null,
    position: 'top_center',
    setPosition: () => {}
});