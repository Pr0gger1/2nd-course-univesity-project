import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register as registerHandler } from '../../store/reducers/AuthSlice';
import ToastContext from "../../context/toast.context";

import { Link } from 'react-router-dom';

import Button from '../ui/button/Button';

import { FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from './AuthForm.module.scss';

const AuthForm = ({ register = false, data, setData}) => {
    const {setPosition, toastElement} = useContext(ToastContext);
    const dispatch = useDispatch();
    const authError =  useSelector(
        state => state.authStates.authError
    );

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const emailValidation = !/\S+@\S+\.\S+/.test(data.email)
        && data.email.length !== 0;

    useEffect(() => {
        setPosition('top_center');
    }, [setPosition]);

    const onChangeHandler = event => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const onSubmitHandler = async event => {
        event.preventDefault();
        if (!data.email || !data.password || (register && !data.repeatPassword))
            return new toastElement("Остались пустые поля", "Ошибка!").error;

        if (register) {
            if (data.password === data.repeatPassword)
                dispatch(registerHandler(data));
            else return new toastElement("Пароли не совпадают", "Ошибка регистрации").error;
        }
        else dispatch(login(data));
    }

    useEffect(() => {
            console.log(authError);
    }, [authError])

    return (
        <form className={styles.auth__form}>
            <div className={styles.form__fields}>
                <FormControl>
                    <TextField
                        helperText={emailValidation ? 'Некорректный email' : ''}
                        error={emailValidation}
                        id='email'
                        label='Email'
                        value={data.email}
                        onChange={onChangeHandler}
                        placeholder='example@example.com'
                        InputProps={{
                            startAdornment:
                            <InputAdornment position='start'>
                                <EmailTwoToneIcon/>
                            </InputAdornment>
                        }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position='start'>
                                    <KeyTwoToneIcon/>
                                </InputAdornment>,
                            endAdornment:
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                        }}
                        id='password'
                        label='Пароль'
                        value={data.password}
                        onChange={onChangeHandler}
                        placeholder='Минимум 8 символов'
                    />
                </FormControl>

                {
                    register &&
                <FormControl>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position='start'>
                                    <KeyTwoToneIcon/>
                                </InputAdornment>,
                            endAdornment:
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                        }}
                        id='repeatPassword'
                        label='Повторите пароль'
                        value={data.repeatPassword}
                        onChange={onChangeHandler}
                        placeholder='Минимум 8 символов'
                    />
                </FormControl>
                }
            </div>

            <Button
                type='submit'
                customClass={styles.login_button}
                variant='long'
                onClick={onSubmitHandler}>
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