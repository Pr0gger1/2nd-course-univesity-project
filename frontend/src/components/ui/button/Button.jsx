import React from 'react';
import styles from './button.module.css';

export const Button = ({children, variant = 'white', ...props}) => {
    return (
        <button className={[styles.button, styles[variant]].join(' ')} {...props}>
            {children}
        </button>
    );
}