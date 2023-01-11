import React from 'react';
import {Link} from 'react-router-dom';

import InputField from '../ui/input/InputField';
import Button from '../ui/button/Button';

import styles from './auth.form.module.css';

const loginButtonStyle = {
    backgroundColor: "#3496f1",
    color: "#ffffff",
    fontWeight: '500',
    fontSize: '1.4rem',
    boxShadow: '0px 10px 30px rgba(20, 140, 252, 0.7)',
    transition: '.5s'
}

const fieldStyle = {
    padding: "1rem 0.5rem 1rem 3rem"
}

const AuthForm = ({ register = false}) => {
    return (
        <form className={styles.auth__form}>
            <div className={styles.form__fields}>
                <div>
                    <label htmlFor="email_field">Логин</label>
                    <InputField type='email'
                                customStyles={fieldStyle}
                                customClasses={[styles.email_icon]}
                                placeholder='example@mail.com'
                                htmlFor='email_field'
                                maxLength={50}/>
                </div>

                <div>
                    <label htmlFor="password_field">Пароль</label>
                    <InputField
                        type='password'
                        customStyles={fieldStyle}
                        customClasses={[styles.password_icon]}
                        placeholder='your password'
                        htmlFor='password_field'
                        maxLength={100}
                        minLength={8}
                        />
                </div>


                {
                register &&
                <div>
                    <label htmlFor="password_repeat_field">Повторите пароль</label>
                    <InputField
                        customStyles={fieldStyle}
                        customClasses={[styles.password_icon]}
                        type='password'
                        placeholder='repeat your password'
                        htmlFor='password_repeat_field'
                        maxLength={100}
                        minLength={8}/>
                </div>
            }
            </div>

            <Button style={loginButtonStyle} type='submit' variant='long'>
                Войти<i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>

            {
                register ?
                <span id={styles['create_account']}>
                    Уже есть аккаунт? <Link to='/login'>Войдите</Link>
                </span>
                    :
                <span id={styles['create_account']}>
                    <span>Еще нет аккаунта?</span> <Link to='/register'>Зарегистрируйтесь</Link>
                </span>
            }
        </form>
    );
}

export default AuthForm;