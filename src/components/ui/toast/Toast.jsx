import {useCallback, useContext, useEffect} from "react";
import {ToastContext} from "../../../context/toast.context";

import styles from "./toast.module.css";

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
            const interval = setInterval(() => {
                deleteToast(toastList[0].id);
            }, fade_time);

            return () => clearInterval(interval);
        }
    }, [deleteToast, fade_time, toastList]);

    return (
        <div className={
            `${styles.toast_container} ${isPosCorrect ? styles[position] : styles["top_right"] }`
        }>
            {
                toastList.map((toast, index) => (
                   <div key={index}
                        className={`${styles.toast} ${styles[toast.type]}
                         ${isPosCorrect ? styles[position] : styles["top_right"]}`
                   }>
                       <span className={styles.close} onClick={() => deleteToast(toast.id)}></span>
                       <div>
                           <p className={styles.title}>{toast.title}</p>
                           <p className={styles.description}>{toast.description}</p>
                       </div>
                   </div>
                ))
            }
        </div>
    )
}

export default Toast;