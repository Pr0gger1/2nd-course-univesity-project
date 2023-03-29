import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteNotification } from '../../../store/reducers/NotificationSlice';

import Button from '@mui/material/Button';

import styles from './styles/Notification.module.scss';


const Notification = ({ data }) => {
    const dispatch = useDispatch();

    const onDoneClick = () => {
        dispatch(deleteNotification({id: data.id}));
    }

    const onReadClick = () => {
        dispatch(deleteNotification({id: data.id}));
    }

    const borderLeft = data.type === 'reminder' ? 'blue' : '#f9266c';

    return (
        <div className={styles.notification}
            style={{
                borderLeft: `2px solid ${borderLeft}`
            }}
        >
            <h5 className={styles.notification__title}>
                {data.taskName}
            </h5>

            <p className={styles.notification__message}>
                {data.message}
            </p>

            <div className={styles.notification__buttons}>
                <Button
                    variant='contained'
                    color='success'
                    className={styles.button__done}
                    onClick={onDoneClick}
                >
                    Выполнить
                </Button>

                <Button
                    variant='outlined'
                    color='error'
                    className={styles.button__read}
                    onClick={onReadClick}
                >
                    Прочитано
                </Button>
            </div>
        </div>
    );
};

export default Notification;