import React, {useState} from 'react';
import styles from './input_field.module.css';

const InputField = (
    {type = 'text', customStyles = {},
    customClasses = [], onChange, ...props}
) => {
    const [value, setValue] = useState('');
    const customClassesVar = [styles.input__field, ...customClasses].join(' ');

    const onChangeHandler = event => setValue(event.target.value);
    return (
        <input className={customClassesVar}
               type={type}
               value={value}
               onChange={e => onChangeHandler(e)}
               // maxLength={max_length}
               style={customStyles}
               {...props}/>
    )
}
export default InputField;