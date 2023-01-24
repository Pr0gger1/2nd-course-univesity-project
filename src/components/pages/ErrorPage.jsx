import React from "react";
import styles from './styles/error_page.module.css';

const ErrorPage = () => {
    return (
        <main className={styles.error__page}>
            <div className={styles.error__message}>404. Not Found</div>
        </main>
    )
}
export default ErrorPage;