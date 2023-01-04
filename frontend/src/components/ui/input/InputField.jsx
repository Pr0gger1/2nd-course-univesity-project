import React, {useState} from 'react';
import styles from './input_field.module.css';

const InputField = ({type = 'text', customStyles = {}, onChange, ...props}) => {
    const [value, setValue] = useState('');

    const onChangeHandler = event => setValue(event.target.value);
    return (
        <input className={styles.input__field}
               type={type}
               onChange={e => onChangeHandler(e)}
               value={value}
               style={customStyles}
               {...props}/>
    )
}
export default InputField;