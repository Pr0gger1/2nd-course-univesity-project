import React, {useContext, useEffect} from 'react';
import ToastContext from "../../context/toast.context";

import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth } from '../../firebase.config';
import { loginHandler, registerHandler } from '../../store/reducers/AuthSlice';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import InputField from '../ui/input/InputField';
import Button from '../ui/button/Button';

import styles from './AuthForm.module.scss';

const fieldStyle = {
    padding: "1rem 0.5rem 1rem 3rem"
}

const AuthForm = ({ register = false, data, setData}) => {
    const {setPosition, toastElement} = useContext(ToastContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setPosition('top_center');
    }, [setPosition]);

    async function loginUser() {
        await signInWithEmailAndPassword(
            auth, data.email, data.password
        )
            .then(creds => {
                if (creds.user) {
                    console.log(creds.user)
                    dispatch(loginHandler({data: creds.user}))
                }
            })
            // .catch(error => dispatch());
    }

    async function registerUser() {
        await createUserWithEmailAndPassword(
            auth, data.email, data.password
        )
            .then(creds => {
                if (creds.user) {
                    dispatch(registerHandler({data: creds.user}));
                    navigate('/');
                }
            })

            .catch(error => dispatch(registerHandler({error})));
    }

    const onChangeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }


    const onSubmitHandler = async event => {
        event.preventDefault();
        if (!data.email || !data.password || (register && !data.repeatPassword)) {
            return new toastElement("Остались пустые поля", "Ошибка!").error
        }
        if (register) {
            await registerUser();
            navigate('/');
        }
        else {
            await loginUser();
            navigate('/')
        }
        return new toastElement("This is a description", "Title").success
    }
    return (
        <form className={styles.auth__form}>
            <div className={styles.form__fields}>
                <div>
                    <label htmlFor="email_field">
                        Логин
                    </label>
                    <InputField type='email'
                        onChange={e => onChangeHandler(e)}
                        value={data.email}
                        customStyles={fieldStyle}
                        customClasses={[styles.email_icon]}
                        placeholder='example@mail.com'
                        htmlFor='email_field'
                        name='email'
                        maxLength={50}
                    />
                </div>

                <div>
                    <label htmlFor="password_field">
                        Пароль
                    </label>
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
                    <label htmlFor="password_repeat_field">
                        Повторите пароль
                    </label>
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
                        minLength={8}
                    />
                </div>
            }
            </div>

            <Button
                type='submit'
                customClass={styles.login_button}
                variant='long'
                onClick={e => onSubmitHandler(e)}>
                {register ? 'Зарегистрироваться' : 'Войти'}
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
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