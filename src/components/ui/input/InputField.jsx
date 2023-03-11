import React from 'react';
import styles from './styles/InputField.module.css';

const InputField = ({
    type = 'text', customStyles = {},
    customClasses = [], ...props}
) => {

    const customClassesVar = [styles.input__field, ...customClasses].join(' ');

    return (
        <input className={customClassesVar}
               type={type}
               style={customStyles}
               {...props}/>
    )
}
export default InputField;