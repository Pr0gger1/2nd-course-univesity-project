import React from 'react';
import {Link} from 'react-router-dom';

import {InputField} from '../ui/input/InputField';
import {Button} from '../ui/button/Button';

import styles from './auth.form.module.css';

const loginButtonStyle = {
    backgroundColor: "#3496f1",
    color: "#ffffff",
    fontWeight: '500',
    fontSize: '1.4rem',
    boxShadow: '0px 10px 30px rgba(20, 140, 252, 0.7)',
    transition: '.5s'
}
export const AuthForm = () => {
    return (
        <form className={styles.auth__form}>
            <div className={styles.email__block}>
                <label htmlFor="email_field">Логин</label>
                <InputField type='email' placeholder='example@mail.com' htmlFor='email_field'/>
            </div>

            <div className={styles.password__block}>
                <label htmlFor="password_field">Пароль</label>
                <InputField type='password' placeholder='your password' htmlFor='password_field'/>
            </div>

            <Button style={loginButtonStyle} type='submit' variant='long'>Войти<i className="fa-solid fa-arrow-right-to-bracket"></i></Button>
            <span id={styles['create_account']}>Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link></span>

        </form>
    );
}