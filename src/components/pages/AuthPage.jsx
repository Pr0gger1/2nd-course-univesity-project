import React, { useEffect, useState } from 'react';
import AuthForm from '../forms/AuthForm';

import styles from './styles/AuthPage.module.scss';
import google_icon from '../../assets/img/icons/google.svg';
import logo from '../../assets/img/logo/logo_vector_white.svg';

const AuthPage = ( {register = false} ) => {
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    useEffect(() => {
        setAuthData({
            email: '',
            password: '',
            repeatPassword: ''
        })
    }, [register]);

    return (
        <div className={styles.container}>
            <div className={styles.login__form}>
                <h1 className={styles.auth__header}>
                    {register ? 'Регистрация' : 'Авторизация'}
                </h1>

                <AuthForm
                    register={register}
                    data={authData}
                    setData={setAuthData}
                />

                <a href='/' className={styles.google_auth__button}>
                    <img src={google_icon} alt="google authorization"/>
                    <span className={styles.google_auth__text}>
                        Авторизоваться через Google
                    </span>
                </a>
            </div>

            <div className={styles.introduce__block}>
                <div className={styles.logo}>
                    <img src={logo} alt="Productify"/>
                </div>
                <div className={styles.introduce__slogan}>
                    <p>Начните планировать свой день уже сегодня</p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;