import {createContext} from "react";

const ToastContext = createContext({
    toastList: [],
    setToastList: () => {},
    toastElement: null,
    position: '',
    setPosition: () => {}
});

export default ToastContext;