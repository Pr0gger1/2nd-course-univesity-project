import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import InputField from '../ui/input/InputField';
import Button from '../ui/button/Button';

import styles from './AuthForm.module.css';
import ToastContext from "../../context/toast.context";

const fieldStyle = {
    padding: "1rem 0.5rem 1rem 3rem"
}

const AuthForm = ({ register = false, data, setData}) => {
    let {setPosition, toastElement} = useContext(ToastContext);


    useEffect(() => {
        setPosition('top_center');
    }, [setPosition]);

    const onChangeHandler = event => setData({...data, [event.target.name]: event.target.value})


    const onSubmitHandler = event => {
        event.preventDefault();
        if (!data.email || !data.password || (register && !data.repeatPassword)) {
            return new toastElement("Остались пустые поля", "Ошибка!").error
        }
        return new toastElement("This is a description", "Title").success
    }
    return (
        <form className={styles.auth__form}>
            <div className={styles.form__fields}>
                <div>
                    <label htmlFor="email_field">Логин</label>
                    <InputField type='email'
                                onChange={e => onChangeHandler(e)}
                                value={data.email}
                                customStyles={fieldStyle}
                                customClasses={[styles.email_icon]}
                                placeholder='example@mail.com'
                                htmlFor='email_field'
                                name='email'
                                maxLength={50}/>
                </div>

                <div>
                    <label htmlFor="password_field">Пароль</label>
                    <InputField
                        type='password'
                        onChange={e => onChangeHandler(e)}
                        value={data.password}
                        customStyles={fieldStyle}
                        customClasses={[styles.password_icon]}
                        placeholder='your password'
                        htmlFor='password_field'
                        name='password'
                        maxLength={100}
                        minLength={8}
                        />
                </div>


                {
                register &&
                <div>
                    <label htmlFor="password_repeat_field">Повторите пароль</label>
                    <InputField
                        type='password'
                        onChange={e => onChangeHandler(e)}
                        value={data.repeatPassword}
                        customStyles={fieldStyle}
                        customClasses={[styles.password_icon]}
                        placeholder='repeat your password'
                        htmlFor='password_repeat_field'
                        name='repeatPassword'
                        maxLength={100}
                        minLength={8}/>
                </div>
            }
            </div>

            <Button
                type='submit'
                customClass={styles.login_button}
                variant='long'
                onClick={e => onSubmitHandler(e)}>
                {register ? 'Зарегистрироваться' : 'Войти'}<i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>

            {
                register ?
                <span id={styles['create_account']}>
                    <b>Уже есть аккаунт? <Link to='/login'>Войдите</Link></b>
                </span>
                    :
                <span id={styles['create_account']}>
                    <b>Еще нет аккаунта? <Link to='/register'>Зарегистрируйтесь</Link></b>
                </span>
            }
        </form>
    );
}

export default AuthForm;