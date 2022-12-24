import React from 'react';
import styles from './input_field.module.css';

export const InputField = ({type = 'text', value, onChange, ...props}) => {
    return (
        <input className={styles.input__field} onChange={e => onChange} {...props}/>
    )
}