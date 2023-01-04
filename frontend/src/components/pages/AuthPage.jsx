import React from 'react';
import AuthForm from '../forms/AuthForm';

import styles from './styles/auth_page.module.css';
import logo from '../../assets/img/logo_vector_white.svg';

const AuthPage = ({type = 'login'}) => {
    return (
        <div className={styles.container}>
            <div className={styles.login__form}>
                <h1>{type === 'login' ? 'Авторизация' : 'Регистрация'}</h1>
                <AuthForm type={type}/>
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

export default AuthPage;