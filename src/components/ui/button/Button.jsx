import React from 'react';
import styles from './styles/button.module.css';

const Button = ({children, variant = 'white', customClass = '', ...props}) => {
    return (
        <button className={[styles.button, styles[variant], customClass].join(' ')} {...props}>
            {children}
        </button>
    );
}
export default Button