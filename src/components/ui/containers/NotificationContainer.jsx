import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../cards/Notification';
import { CSSTransition } from 'react-transition-group';
import styles from './styles/NotificationContainer.module.scss';
import { TransitionGroup } from 'react-transition-group';
import '../animations/Notifications/notificationAnimation.css';

const NotificationContainer = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        state => state.notificationState.notifications
    );

    const [show, setShow] = useState(true);

    return (
        <div className={styles.notification__container}>
            {
                notifications.length === 0 && 
                <span>Нет уведомлений</span>
            }

                <TransitionGroup className={styles.wrapper}>
                    {
                        notifications.map((notify, index) => 
                        <CSSTransition
                            key={index}
                            in={show}
                            classNames="notification"
                            timeout={300}
                            
                        >
                            <Notification
                                data={notify}
                            />
                        </CSSTransition>
                        )
                    }
                </TransitionGroup>
        </div>
    );
};

export default NotificationContainer;