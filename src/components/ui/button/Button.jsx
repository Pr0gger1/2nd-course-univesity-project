import React from 'react';
import styles from './styles/button.module.css';

const Button = ({children, variant = 'white', customClass = '', cs = {}, ...props}) => {
    return (
        <button
            className={[styles.button, styles[variant], customClass].join(' ')}
            style={cs}
            {...props}
        >
            {children}
        </button>
    );
}
export default Button