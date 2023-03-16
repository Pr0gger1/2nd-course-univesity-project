import React from 'react';
import styles from './styles/ModalWindow.module.scss';

const ModalWindow = ({ children, visible, setVisible }) => {
    const modalClasses = [styles.modal__container];

    if (visible)
        modalClasses.push(styles.active);

    return (
        <div className={modalClasses.join(' ')}>
            <div className={styles.modal__content}>
                { children }
            </div>
        </div>
    );
};

export default ModalWindow;