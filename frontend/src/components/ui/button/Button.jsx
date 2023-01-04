import React from 'react';
import styles from './button.module.css';

const Button = ({children, variant = 'white', ...props}) => {
    return (
        <button className={[styles.button, styles[variant]].join(' ')} {...props}>
            {children}
        </button>
    );
}
export default Button