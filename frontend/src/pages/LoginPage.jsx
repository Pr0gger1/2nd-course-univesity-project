import React from 'react';
import {AuthForm} from '../components/forms/AuthForm';
import styles from './styles/auth_page.module.css';
import logo from '../assets/img/Logo vector white.svg';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.login__form}>
                <h1>Авторизация</h1>
                <AuthForm/>
            </div>

            <div className={styles.introduce__block}>
                <div className={styles.logo}>
                    <img src={logo} alt="Productify"/>
                </div>
                <div className={styles.introduce__slogan}>
                    Начните планировать свой день уже сегодня
                </div>
            </div>
        </div>
    )
}
export default LoginPage;