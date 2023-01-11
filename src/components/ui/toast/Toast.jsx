import {useCallback, useContext, useEffect} from "react";
import classes from "./toast.module.css";
import {ToastContext} from "../../../context/toast.context";

const Toast = ({position = "top_right", fade_time = 3000}) => {
    let isPosCorrect = ["top_right", "top_left", "top_center", "bottom_right", "bottom_left", "bottom_center"]
        .includes(position);

    const {setToastList, toastList} = useContext(ToastContext);

    const deleteToast = useCallback(id => {
        setToastList(toastList.filter(el => el.id !== id));
    }, [setToastList, toastList]);


    // toast disappearance mechanism
    useEffect(() => {
        if (toastList.length) {
            let interval = setInterval(() => {
                deleteToast(toastList[0].id);
            }, fade_time);

            return () => clearInterval(interval);
        }
    }, [deleteToast, fade_time, toastList]);

    return (
        <div className={
            `${classes.toast_container} ${isPosCorrect ? classes[position] : classes["top_right"] }`
        }>
            {
                toastList.map((toast, index) => (
                   <div key={index}
                        className={`${classes.toast} ${classes[toast.type]}
                         ${isPosCorrect ? classes[position] : classes["top_right"]}`
                   }>
                       <span className={classes.close} onClick={() => deleteToast(toast.id)}></span>
                       <div>
                           <p className={classes.title}>{toast.title}</p>
                           <p className={classes.description}>{toast.description}</p>
                       </div>
                       {/*frozen component*/}
                       {/*<div className={classes.progress_bar}></div>*/}

                   </div>
                ))
            }
        </div>
    )
}

export default Toast;