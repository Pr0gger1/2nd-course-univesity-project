import React, {useContext} from "react";
import ToastContext from "../../context/toast.context";
import styles from './styles/home_page.module.css';

const HomePage = () => {
    const {toastElement} = useContext(ToastContext)

    return (
        <main className={styles.main__container}>
            <button onClick={() => new toastElement('desc', 'title').success}>Click</button>
        </main>
    )
}

export default HomePage;